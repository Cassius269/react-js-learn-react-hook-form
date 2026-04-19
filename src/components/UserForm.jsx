import { useForm } from "react-hook-form";

function UserForm() {
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
            {...register("firstname", {
              required: {
                value: true,
                message: "Le champs est obligatoire",
              },
              minLength: {
                value: 3, // longueur
                message: "Trop court !",
              },
            })}
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
            {...register("lastname", {
              // disabled: true,
              required: {
                value: true,
                message: "Le champs est obligatoire",
              },
              minLength: {
                value: 3, // longueur minimale
                message: "Trop court !",
              },
              validate(value) {
                if (value === "Jean") {
                  return true;
                } else {
                  return "Mauvais nom de famille";
                }
              },
            })}
          />
          {errors?.lastname && (
            <p className="text-danger">{errors.lastname.message}</p>
          )}
        </div>
        <div className="mt-2">
          <label className="form-label" htmlFor="firstname">
            Âge
          </label>
          <input
            className="form-control"
            id="age"
            type="number"
            name="age"
            {...register("age", {
              // disabled: true,
              valueAsNumber: true, // récupérer l'age en int
              required: {
                value: true,
                message: "L'âge est obligatoire",
              },
              min: {
                value: 1, // longueur minimale
                message: "Trop court !",
              },
              onBlur(e) {
                console.log("évenement blur sur l'âge", e);
              },
            })}
          />
          {errors?.age && <p className="text-danger">{errors.age.message}</p>}
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
