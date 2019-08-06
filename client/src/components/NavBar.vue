<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Sarcina</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown" v-if="isLogin && getState.role == 'leader'">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Opciones</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a
                class="dropdown-item"
                href="modal"
                data-toggle="modal"
                data-target="#modalMember"
              >Añadir Miembro</a>
              <a class="dropdown-item" href="#">Ver Miembros</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0" v-if="!isLogin">
          <button
            class="btn btn-outline-success my-2 my-sm-0"
            href="modal"
            data-toggle="modal"
            data-target="#modalLogin"
          >Login</button>
        </form>
        <form class="form-inline my-2 my-lg-0" v-else>
          <button
            class="btn btn-outline-success my-2 my-sm-0"
            @click="logout"
          >Logout {{getState.name}}</button>
        </form>
      </div>
    </nav>
    <ModalLogin />
    <ModalMember />
  </div>
</template>

<script>
import ModalLogin from "./ModalLogin";
import ModalMember from "./ModalMember";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    ModalLogin,
    ModalMember,
  },
  computed: {
    ...mapGetters(["isLogin", "getState"])
  },
  methods: {
    ...mapActions(["newUser"]),
    logout() {
      this.newUser("");
      $("#modalLogin").modal("toggle");
      this.$router.push("/");
    }
  }
};
</script>
