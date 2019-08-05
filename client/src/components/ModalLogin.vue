<template>
  <div class="modal" tabindex="-1" role="dialog" id="modalLogin">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Iniciar Sesión</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                v-model="user"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" v-model="password" placeholder="Password" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="login">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex"; //Actions dentro de metodos y getters dentro de computed
export default {
  data() {
    return {
      user: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(['newUser']),
    login() {
      const data = {
        user: this.user,
        password: this.password
      };
      axios
        .post("http://127.0.0.1:3030/api/login", data)
        .then(res => {
          this.newUser(res.data);
          $('#modalLogin').modal('toggle'); 
          this.$router.push('/index');
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  },
  computed: {
    ...mapGetters(['getState'])
  },
};
</script>

