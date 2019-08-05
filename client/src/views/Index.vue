<template>
  <div>
    <div class="container">
      <div class="row pt-3">
        <div class="col-md-5">
          <div class="card">
            <div class="card-header">
              <h3>Añadir Tarea</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input type="text" v-model="task.title" class="form-control" placeholder="Titúlo">
                </div>
                <div class="form-group">
                  <textarea v-model="task.description" cols="30" rows="3" placeholder="Descripción" class="form-control"></textarea>
                </div>
                <div class="form-group">
                  <select v-model="responsable" class="form-control">
                    <option value="Seleccionar">Seleccionar</option>
                    <option v-for="(user, index) in users" key="index">
                      {{user.name}}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <input type="number" v-model="task.estimatedTime" class="form-control" placeholder="Tempo estimado en días">
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
                <th>Task</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task of tasks">
                <td>{{task.title}}</td>
                <td>{{task.description}}</td>
                <td>
                  <button @click="deleteTask(task._id)" class="btn btn-danger">Delete</button>
                  <button @click="editTask(task._id)" class="btn btn-secondary">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Task {
  constructor(title = '', description = '') {
    this.title = title;
    this.description = description;
  }
}
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
  mounted() {
    !this.isLogin ? this.$router.push('/'):null;
  },
  computed: {
    ...mapGetters(['isLogin', 'getState']),
  },
  data() {
    return {
      task: new Task(),
      tasks: [],
      edit: false,
      taskToEdit: '',
      users: [],
      selectedUser: 'Seleccionar',
    }
  },
  created() {
    this.getTasks();
    this.getUsers(this.getState.idTeam);
  },
  methods: {
    sendTask() {
      if(this.edit === false) {
        axios.post('http://127.0.0.1:3030/api/tasks', this.task)
          .then(res => {
            res.data;
            this.getTasks();
            this.task = new Task();
          });
      }
      else {
        axios.put(`http://127.0.0.1:3030/api/tasks/${this.taskToEdit}`, this.task)
          .then(res => {
            res.data;
            this.getTasks();
            this.task = new Task();
            this.edit = !this.edit;
          });
      }
    },
    getTasks() {
      axios.get('http://127.0.0.1:3030/api/tasks')
        .then(res => {
          this.tasks = res.data;
        });
    },
    deleteTask(taskId) {
      axios.delete(`http://127.0.0.1:3030/api/tasks/${taskId}`)
        .then(res => res)
        .then(data => {
          this.getTasks();
        });
    },
    editTask(taskId) {
      axios.get(`http://127.0.0.1:3030/api/tasks/${taskId}`)
        .then(res => {
          const { data } =  res;
          const { _id, title, description } = data;
          this.task = new Task(title, description);
          this.taskToEdit = _id;
          this.edit = true;
        });
    },
    getUsers(teamId) {
      axios.get(`http://127.0.0.1:3030/api/users/team/${teamId}`)
        .then((res) => {
          this.users = res.data.users;
          console.log(this.users);
        });
    }
  }
}
</script>
