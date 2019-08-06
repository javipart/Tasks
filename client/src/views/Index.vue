<template>
  <div>
    <div class="container">
      <div class="row pt-3">
        <div class="col-md-5">
          <div class="card" v-if="getState.role == 'leader'">
            <div class="card-header">
              <h3>Añadir Tarea</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input type="text" v-model="task.title" class="form-control" placeholder="Titúlo" />
                </div>
                <div class="form-group">
                  <textarea
                    v-model="task.description"
                    cols="30"
                    rows="3"
                    placeholder="Descripción"
                    class="form-control"
                  ></textarea>
                </div>
                <div class="form-group">
                  <select v-model="task.responsable" class="form-control">
                    <option value="Seleccionar Responsable">Seleccionar Responsable</option>
                    <option v-for="(user, index) in users">{{user.name}}</option>
                  </select>
                </div>
                <div class="form-group">
                  <select v-model="task.statusTask" class="form-control">
                    <option value="Seleccionar Estado">Seleccionar Estado</option>
                    <option>Por Hacer</option>
                    <option>En Proceso</option>
                    <option>En Revisión</option>
                    <option>Terminada</option>
                  </select>
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    v-model="task.estimatedTime"
                    class="form-control"
                    placeholder="Tiempo estimado en días"
                  />
                </div>
                <template v-if="edit === false">
                  <button class="btn btn-primary btn-block">Registrar</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-block">Actualizar</button>
                </template>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div>
            <h3>Lista de Tareas</h3>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Tarea</th>
                <th>Descripción</th>
                <th>Responsable</th>
                <th>Tiempo Estimado</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task of tasks">
                <td>{{task.title}}</td>
                <td>{{task.description}}</td>
                <td>{{task.responsable}}</td>
                <th>{{task.estimatedTime}}</th>
                <td>
                  <select v-model="task.statusTask" class="form-control" @change="onChange(task.statusTask, task._id)">
                    <option>Por Hacer</option>
                    <option>En Proceso</option>
                    <option>En Revisión</option>
                    <option>Terminada</option>
                  </select>
                </td>
                <td v-if="getState.role == 'leader'">
                  <button @click="deleteTask(task._id)" class="btn btn-danger">Delete</button>
                  <button @click="editTask(task._id)" class="btn btn-secondary">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-5">
          <div>
            <h3>Estado de Tareas</h3>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Por Hacer</th>
                <th>En Proceso</th>
                <th>En Revisión</th>
                <th>Terminada</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task, index) of tasks" :key="index">
                <td v-if="task.statusTask == 'Por Hacer'">{{task.title}}</td>
                <td v-else></td>
                <td v-if="task.statusTask == 'En Proceso'">{{task.title}}</td>
                <td v-else></td>
                <td v-if="task.statusTask == 'En Revisión'">{{task.title}}</td>
                <td v-else></td>
                <td v-if="task.statusTask == 'Terminada'">{{task.title}}</td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Task {
  constructor(
    title = "",
    description = "",
    responsable = "",
    estimatedTime = "",
    statusTask = "",
    team = ""
  ) {
    this.title = title;
    this.description = description;
    this.responsable = responsable;
    this.estimatedTime = estimatedTime;
    this.statusTask = statusTask;
    this.team = team;
  }
}
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  mounted() {
    !this.isLogin ? this.$router.push("/") : null;
  },
  computed: {
    ...mapGetters(["isLogin", "getState"])
  },
  data() {
    return {
      task: new Task(),
      tasks: [],
      edit: false,
      taskToEdit: "",
      users: [],
      responsable: "Seleccionar Responsable",
      statusTask: "Seleccionar Estado",
      isChange: false,
    };
  },
  created() {
    this.getTasks(this.getState.idTeam);
    this.getUsers(this.getState.idTeam);
  },
  methods: {
    onChange(statusTask, id) {
      this.isChange = true;
      this.statusTask = statusTask;
      console.log(this.statusTask);
      this.editTask(id);
    },
    sendTask() {
      const idTeam = this.getState.idTeam;
      this.task.team = idTeam;
      if (this.edit === false) {
        axios.post("http://127.0.0.1:3030/api/tasks", this.task).then(res => {
          res.data;
          this.getTasks(idTeam);
          this.task = new Task();
        });
      } else {
        axios
          .put(`http://127.0.0.1:3030/api/tasks/${this.taskToEdit}`, this.task)
          .then(res => {
            res.data;
            this.getTasks(idTeam);
            this.task = new Task();
            this.edit = !this.edit;
          });
      }
    },
    getTasks(idTeam) {
      const name = this.getState.name;
      if (this.getState.role == "leader") {
        axios
          .get(`http://127.0.0.1:3030/api/tasks/team/${idTeam}`)
          .then(res => {
            this.tasks = res.data.tasks;
          });
      }
      axios.get(`http://127.0.0.1:3030/api/tasks/user/${name}`).then(res => {
        this.tasks = res.data.tasks;
      });
    },
    deleteTask(taskId) {
      const idTeam = this.getState.idTeam;
      axios
        .delete(`http://127.0.0.1:3030/api/tasks/${taskId}`)
        .then(res => res)
        .then(data => {
          this.getTasks(idTeam);
        });
    },
    editTask(taskId) {
      axios.get(`http://127.0.0.1:3030/api/tasks/${taskId}`).then(res => {
        const { data } = res;
        let {
          _id,
          title,
          description,
          responsable,
          estimatedTime,
          statusTask,
          team
        } = data;
        this.isChange ? statusTask = this.statusTask : statusTask;
        console.log(statusTask);
        this.task = new Task(
          title,
          description,
          responsable,
          estimatedTime,
          statusTask,
          team
        );
        this.taskToEdit = _id;
        this.edit = true;

        this.isChange ? this.sendTask():null;
      });
    },
    getUsers(teamId) {
      axios.get(`http://127.0.0.1:3030/api/users/team/${teamId}`).then(res => {
        this.users = res.data.users;
      });
    }
  }
};
</script>
