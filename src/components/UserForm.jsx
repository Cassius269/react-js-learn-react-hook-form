import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";

function UserForm() {
  // Déclaration du schema de validation
  const yupSchema = yup.object({
    firstname: yup
      .string() // type de données chaâine de caractères
      .required("Le prénom est obligatoire")
      .min(3, "Prénom court !")
      .max(10, "Prénom long !"),
    // .test("isYes", "Vous n'avez pas de chance", async () => {
    //   const response = await fetch("https://yesno.wtf/api");
    //   const data = await response.json();

    //   return data.answer === "yes";
    // })
    lastname: yup
      .string()
      .required("Le nom de famille est obligatoire")
      .min(3, "Nom court !")
      .max(10, "Nom long !"),
    age: yup
      .number()
      .typeError("Veuillez entrer un nombre")
      .min(18, "Doit être majeur"),
    other: yup.object({
      sign: yup.string().required("Champs obligatoire"),
    }),
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

  // Valeurs par défaut
  const defaultValues = {
    // Valeurs par défaut (intéressant pour la mise à jour de donnée existante)
    firstname: "",
    lastname: "",
    gender: "man",
    password: "",
    other: {
      sign: "",
      happy: false,
    },
    activities: [],
  };

  // Déclaration de la gestion de formulaire avec react-hook-form
  const {
    register,
    getValues,
    watch,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    setFocus, // donner le focus à un champs après récupération d'erreur
    trigger,
    control, // permet d'ajout des champs à la volée
    reset, // réinitialiser le formulaire
    handleSubmit,
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(yupSchema),
    criteriaMode: "all",
    mode: "onChange", // validation des données entrantes à la soumission du formulaire
  });

  // Gérer les champs dynamiques
  const { fields, append, remove } = useFieldArray({
    name: "activities",
    control,
  });

  const addActivity = () => {
    append({
      value: "", // création de champs avec valeur par défaut chaîne de caractère(s) vide
    });
  };

  // Surveiller toutes les valeurs du formulaire et les afficher
  watch("activities");
  console.log("Erreur", errors);
  // Fonction pour gérer la soumission de formulaire
  async function submit(values) {
    const { confirmPassword, ...payload } = values;

    const finalPayload = {
      ...payload,
      activities: payload.activities.map((a) => a.value),
    };

    console.log(values); // afficher les valeurs de champs
    try {
      const response = await fetch("https://www.restapi.fr/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalPayload),
      });

      if (response.ok) {
        const data = await response.json();
        reset(defaultValues); // réinitiliser le formulaire avec les valeurs par défaut
        console.log("Nouvel utilisateur", data);
        // throw new Error("Hello");
      } else {
        console.log("Oops il y a une erreur");
      }
    } catch (e) {
      console.error(`Erreur: ${e.message}`);
      // setError("firstname", { type: "firstname", message: e.message });
    }
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
            {...register("firstname", {
              onBlur() {
                trigger("firstname");
              },
            })}
          />
          {errors?.firstname && (
            <ul>
              {Object.keys(errors.firstname.types).map((k) => (
                <li key={k} className="text-danger">
                  {errors.firstname.types[k]}
                </li>
              ))}
            </ul>
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
            <ul>
              {Object.keys(errors.lastname.types).map((k) => (
                <li key={k} className="text-danger">
                  {errors.lastname.types[k]}
                </li>
              ))}
            </ul>
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
          {errors?.age && (
            <ul>
              {Object.keys(errors.age.types).map((k) => (
                <li key={k} className="text-danger">
                  {errors.age.types[k]}
                </li>
              ))}
            </ul>
          )}
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
          <label htmlFor="sign">Signe astrologique</label>
          {errors?.other?.sign && (
            <p className="text-danger">{errors.other.sign.message}</p>
          )}
        </div>
        <div className="mt-3">
          <label className="mb-2 ">
            <span>Activités</span>
            <button
              onClick={addActivity}
              type="button"
              className="btn btn-warning ms-2"
            >
              +
            </button>
          </label>
          <ul>
            {fields.map((activity, index) => (
              <li key={activity.id} className="d-flex gap-3 mt-2">
                <input
                  type="text"
                  id="activity"
                  className="form-control"
                  {...register(`activities.${index}.value`)}
                />
                <label htmlFor="activity"></label>
                <button
                  onClick={() => remove(index)}
                  type="button"
                  className="btn btn-danger"
                >
                  -
                </button>
              </li>
            ))}
          </ul>
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
            <ul>
              {Object.keys(errors.password.types).map((k) => (
                <li key={k} className="text-danger">
                  {errors.password.types[k]}
                </li>
              ))}
            </ul>
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
            <ul>
              {Object.keys(errors.confirmPassword.types).map((k) => (
                <li key={k} className="text-danger">
                  {errors.confirmPassword.types[k]}
                </li>
              ))}
            </ul>
          )}
        </div>
        <input
          className="btn btn-primary mt-3"
          type="submit"
          value={"Sauvegarder"}
          disabled={isSubmitting}
        />
      </form>
    </>
  );
}

export default UserForm;
