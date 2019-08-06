<template>
  <div class="modal" tabindex="-1" role="dialog" id="modalMember">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Agregar Miembro al Equipo</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="exampleFormControlInput1">Nombre de Usuario</label>
              <input
                type="text"
                class="form-control"
                v-model="user"
                id="exampleFormControlInput1"
                placeholder="nameuser"
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Contraseña</label>
              <input
                type="password"
                class="form-control"
                v-model="password"
                id="exampleFormControlInput1"
                placeholder="Password"
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlInput1">Nombre</label>
              <input
                type="text"
                class="form-control"
                v-model="name"
                id="exampleFormControlInput1"
                placeholder="Nombre Apellido"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="saveUser" data-dismiss="modal">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class User {
  constructor(user = "", password = "", name = "", team = "", role = "") {
    this.user = user;
    this.password = password;
    this.name = name;
    this.team = team;
    this.role = role;
  }
}
import axios from "axios";
import { mapActions, mapGetters } from "vuex"; //Actions dentro de metodos y getters dentro de computed
export default {
  data() {
    return {
      user: new User(),
      user: "",
      password: "",
      name: "",
      team: "",
      role: ""
    };
  },
  methods: {
    ...mapActions(["newUser"]),
    saveUser() {
      const data = {
        user: this.user,
        password: this.password,
        name: this.name,
        team: this.getState.idTeam,
        role: 'member',
      };
      axios
        .post("http://127.0.0.1:3030/api/users", data)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  },
  computed: {
    ...mapGetters(["getState"])
  }
};
</script>

