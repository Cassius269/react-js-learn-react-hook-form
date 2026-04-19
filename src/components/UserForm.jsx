import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

function UserForm() {
  // Déclaration du schema de validation
  const yupSchema = yup.object({
    firstname: yup
      .string() // type de données chaâine de caractères
      .required("Le prénom est obligatoire")
      .min(3, "Trop court !")
      .max(5, "Trop long !")
      .test("isYes", "Vous n'avez pas de chance", async () => {
        const response = await fetch("https://yesno.wtf/api");
        const data = await response.json();

        return data.answer === "yes";
      }),
    lastname: yup
      .string()
      .required("Le nom de famille est obligatoire")
      .min(3, "Trop court !")
      .max(5, "Trop long !"),
    age: yup
      .number()
      .typeError("Veuillez entrer un nombre")
      .min(18, "Doit être majeur"),
    password: yup
      .string()
      .required("Le mot de passe est obligatoire")
      .min(6, "Mot de passe trop court !")
      .max(15, "Mot de passe trop long !"),
    confirmPassword: yup
      .string()
      .required("Vous devez confirmer votre mot de passe")
      .oneOf(
        [yup.ref("password"), ""], // recupérer le champs password
        "Les mots de passe ne correspondent pas", // Le message d'erreur
      ),
  });

  // Déclaration de la gestion de formulaire avec react-hook-form
  const {
    register,
    getValues,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      // Valeurs par défaut (intéressant pour la mise à jour de donnée existante)
      firstname: "",
      lastname: "",
    },
    resolver: yupResolver(yupSchema),
    mode: "onSubmit", // validation des données entrantes à la soumission du formulaire
  });

  // Surveiller toutes les valeurs du formulaire et les afficher
  watch();
  console.log(getValues());

  // Fonction pour gérer la soumission de formulaire
  function submit(values) {
    console.log(values); // afficher les valeurs de champs
  }

  console.log(errors);
  return (
    <>
      <form action="#" method="POST" onSubmit={handleSubmit(submit)}>
        <div>
          <label className="form-label" htmlFor="firstname">
            Prénom
          </label>
          <input
            className="form-control"
            id="firstname"
            type="text"
            name="firstname"
            {...register("firstname")}
          />
          {errors?.firstname && (
            <p className="text-danger">{errors.firstname.message}</p>
          )}
        </div>
        <div className="mt-2">
          <label className="form-label" htmlFor="firstname">
            Nom de famillle
          </label>
          <input
            className="form-control"
            id="lastname"
            type="text"
            name="lastname"
            {...register("lastname")}
          />
          {errors?.lastname && (
            <p className="text-danger">{errors.lastname.message}</p>
          )}
        </div>{" "}
        <div className="mt-2">
          <label className="form-label" htmlFor="firstname">
            Âge
          </label>
          <input
            className="form-control"
            id="age"
            type="number"
            name="age"
            {...register("age")}
          />
          {errors?.age && <p className="text-danger">{errors.age.message}</p>}
        </div>
        <div className="mt-2">
          <label className="form-label" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="form-control"
            id="password"
            type="password"
            name="password"
            {...register("password")}
          />
          {errors?.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div className="mt-2">
          <label className="form-label" htmlFor="confirmPassword">
            Mot de passe de confirmation
          </label>
          <input
            className="form-control"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            {...register("confirmPassword")}
          />
          {errors?.confirmPassword && (
            <p className="text-danger">{errors.confirmPassword.message}</p>
          )}
        </div>
        <input
          className="btn btn-primary mt-3"
          type="submit"
          value={"Sauvegarder"}
        />
      </form>
    </>
  );
}

export default UserForm;
