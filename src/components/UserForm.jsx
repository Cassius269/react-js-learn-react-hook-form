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
      gender: "man",
    },
    other: {
      sign: "",
      happy: false,
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
            {...register("firstname")}
          />
          {errors?.firstname && (
            <p className="text-danger">{errors.firstname.message}</p>
          )}
        </div>
        <div className="mt-2">
          <label className="form-label" htmlFor="lastname">
            Nom de famillle
          </label>
          <input
            className="form-control"
            id="lastname"
            type="text"
            {...register("lastname")}
          />
          {errors?.lastname && (
            <p className="text-danger">{errors.lastname.message}</p>
          )}
        </div>{" "}
        <div className="mt-2">
          <label className="form-label" htmlFor="age">
            Âge
          </label>
          <input
            className="form-control"
            id="age"
            type="number"
            {...register("age")}
          />
          {errors?.age && <p className="text-danger">{errors.age.message}</p>}
        </div>
        <div className="mt-4 form-check">
          <p className="lh-1 mb-1">Votre genre ?</p>
          <div className="d-flex gap-5">
            <div>
              <label htmlFor="man">Masculin</label>
              <input
                {...register("gender")}
                type="radio"
                id="man"
                value={"man"}
                className="form-check-input"
              />
            </div>
            <div>
              <label className="form-check-label" htmlFor="woman">
                Féminin
              </label>
              <input
                {...register("gender")}
                type="radio"
                id="woman"
                value={"woman"}
                className="form-check-input"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 d-flex gap-3">
          <p>Content ?</p>
          <div className="d-flex gap-2">
            <input
              {...register("other.happy")}
              type="checkbox"
              id="yes"
              value={true}
              className="form-check-input"
            />
            <label htmlFor="yes" className="form-check-label">
              Oui
            </label>
          </div>
        </div>
        <div className="form-floating">
          <select {...register("other.sign")} className="form-select" id="sign">
            <option value="">Veuillez ouvrir le menu</option>
            <option value="poisson">Poisson</option>
            <option value="verseau">Verseau</option>
            <option value="lion">Lion</option>
          </select>
          <label htmlFor="floatingSelectDisabled">Signe</label>
        </div>
        <div className="mt-2">
          <label className="form-label" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="form-control"
            id="password"
            type="password"
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
