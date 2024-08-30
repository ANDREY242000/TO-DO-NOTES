<template>
    <header-component>
    <button @click="pushAuth" class="out_button">выйти</button>
     <button @click="pushBoard" class="out_button_board">доски</button>   
    <button @click="openModalStatus" class="add-board-button">создать</button>
  </header-component>
  <main class="container">
    <div class="title_header">
      <h2 class="title_container">
        список задач доски: {{ this.$route.params.id }}
      </h2>
    </div>
    <div class="container_status">
      <section
        class="kanban_column"
        v-for="item in statusesList"
        :key="item.id"
        @drop="moveTask($event, group.statuses)"
@dragover.prevent
@dragenter.prevent
        
        
      >
        <div class="kanban__header">
          <div class="kanban__header-content">
            <h2 class="kanban__title">{{ item.name }}</h2>
          </div>
        </div>
        <div class="kanban__list" >
          <!-- ----------------------компонент задач--------------------------------------------- -->
          <div
            class="task-item"
            v-for="itemTask in tasksList[item.id]"
            :key="itemTask.id"
            draggable="true"
            @dragstart="onMoveTask($event,itemTask.id)"
          >
            <div class="task-item_info">
              <div class="title_task">
                <h3 class="task-item__title">{{ itemTask.name }}</h3>
                <img
                  src="@/component/UI/pencil.jpg"
                  alt="редактировать задачу"
                  class="button_edit--add"
                  @click='openModalEditTask(itemTask.id,item.id)'
                />
                <img
                  src="@/component/UI/basketS.jpg"
                  alt="редактировать задачу"
                  class="button_edit--add"
                  @click='deleteTasksHandler(itemTask.id)'
                />
              </div>
              <div class="task-item__description">
                {{ itemTask.description }}
              </div>
              <div class="task-item__comlex_conteiner">
                <div class="task-item__complexity">
                  <div class="complexity__dot"></div>
                  <div class="complexity__dot"></div>
                  <div class="complexity__dot"></div>
                </div>
                <div class="task-item__client">{{ itemTask.plannedCompletionAt }}</div>
              </div>
            </div>
          </div>
          <!-------------------------------------------------------------------->
        </div>
        <div class="kanban_footer">
          <button class="delete_task" @click="deleteStatusesHandler(item.id)">
            удалить
          </button>
          <button class="patch_task" @click="openModalEditStatuses(item.id)">изменить</button>
          <button class="add_task" @click="openModalTask(item.id)">
            добавить
          </button>
        </div>
      </section>
    </div>
    <!-- --------------------------------------------------------------------------------------------- -->
    <edit-modal-statuses v-if="visibleEditModalStatuses" class="molal_board">
      <div class="form">
        <input
          v-model="name"
          type="text"
          name="title"
          placeholder="измените название статуса"
        />
        <button @click="editStatusesHandler">Отправить</button>
        <button type="button" class="cancel-button" @click="closeModalEditStatuses">
          Отмена
        </button>
      </div>
    </edit-modal-statuses>
    <!----------------------------модалка редактирования задач ------------------------------------------>
      <edit-modal-task v-if="visibleEditModalTask" >
            <div class="form">
            <input v-model="name"  type="text"  name="title" placeholder="Введите заголовок задачи"/>
            <textarea v-model="description"  name="description" placeholder="Введите описание задачи"></textarea>
            <input v-model="date"  type="date" name="date" placeholder="Выберите дату"/>
            <button  @click.prevent="editTasksHandler">Отправить</button>
            <button type="button" class="cancel-button" @click="closeEditModalTask">Отмена</button>
          </div>
      </edit-modal-task>
    <!----------------------------модалка задач------------------------------------------>
    <modal-task v-if="visibleTask" class="molal_board">
      <div class="form">
        <input
          v-model="name"
          type="text"
          name="title"
          placeholder="Введите название доски"
        />
        <textarea
          v-model="description"
          name="description"
          placeholder="Введите описание доски"
        ></textarea>
        <input
          v-model="date"
          type="date"
          name="date"
          placeholder="Выберите дату"
        />
        <button @click.prevent="addTasksHandler">Отправить</button>
        <button type="button" class="cancel-button" @click="closeModalTask">
          Отмена
        </button>
      </div>
    </modal-task>
    <!------------------------модалка статусов----------------------------------------------->
    <modal-board v-if="visibleStatus" class="molal_board">
      <div class="form">
        <input
          v-model="name"
          type="text"
          name="title"
          placeholder="Введите название статуса"
        />
        <button @click.prevent="addStatusesHandler">Отправить</button>
        <button type="button" class="cancel-button" @click="closeModalStatus">
          Отмена
        </button>
      </div>
    </modal-board>
  </main>
  <footer-component />
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import EditModalStatuses from "../component/EditModalStatuses.vue";
import EditModalTask from "../component/EditModalTask.vue";
import HeaderComponent from "../component/HeaderComponent.vue";
import FooterComponent from "../component/FooterComponent.vue";
import ModalBoard from "../component/ModalBoard.vue";
import ModalTask from "../component/ModalTask.vue";

import convertDateToISO from "../tools"

export default defineComponent({
  name: "TheTasks",

  components: {
    EditModalStatuses,
    EditModalTask,
    HeaderComponent,
    FooterComponent,
    ModalBoard,
    ModalTask,
  },

  data() {
    return {
      currentStatusTaskId: null,
      currentTasksId:null,
      currentStatusId: null,
      currentTaskEditsId:null,
      currentTasksId:null,
      boardId: this.$route.params.id,
      name: "",
      description: "",
      date: null,
      visibleTask: false,
      visibleStatus: false,
      visibleEditModalTask:false,
      visibleEditModalStatuses:false
    };
  },
  computed: {
    ...mapGetters({
      statusesList: "statusesStore/getStatuses",
      tasksList: "tasksStore/getTasks",
    }),
  },

  async created() {
    await this.initTasks(this.boardId);
    await this.initStatuses(this.boardId);
  },

  methods: {



    ...mapActions({
      initStatuses: "statusesStore/initStatuses",
      addStatuses: "statusesStore/addStatuses",
      editStatuses: "statusesStore/editStatuses",
      deleteStatuses: "statusesStore/deleteStatuses",
      initTasks: "tasksStore/initTasks",
      addTasks: "tasksStore/addTasks",
      editTasks: "tasksStore/editTasks",
      deleteTasks: "tasksStore/deleteTasks"
    }),

    async deleteTasksHandler(tasksId) {
      this.currentTasksId = tasksId;
      await this.deleteTasks({boardId: this.boardId, currentTasksId: tasksId});
    },


    async deleteStatusesHandler(statusId) {
      this.currentStatusId = statusId;
      await this.deleteStatuses({boardId: this.boardId, currentStatusId: statusId});

    },

    async editStatusesHandler() {
      const params = {
        boardId: this.boardId,
        statusesId: this.currentStatusTaskId,
        formData: {
          name: this.name,
        },
      };
      await this.editStatuses(params);
      this.name = "";
      this.closeModalEditStatuses();
    },


    async editTasksHandler() {
      const params = {
        tasksId:this.currentTasksId,
        boardId: this.boardId,
        formData: {
          statusId: this.currentStatusTaskId,
          name: this.name,
          description: this.description,
          plannedCompletionAt: convertDateToISO(this.date),
        },
      };
      await this.editTasks(params);
      this.name = "";
      this.description = "";
      this.selectedDate = "";
      this.closeEditModalTask();
    },





    async addTasksHandler() {
      const params = {
        boardId: this.boardId,
        formData: {
          statusId: this.currentStatusId,
          name: this.name,
          description: this.description,
          plannedCompletionAt: convertDateToISO(this.date),
        },
      };
      await this.addTasks(params);
      this.name = "";
      this.description = "";
      this.selectedDate = "";
      this.closeModalTask();
    },

    async addStatusesHandler() {
      const params = {
        boardId: this.boardId,
        formData: {
          name: this.name,
        },
      };
      await this.addStatuses(params);
      this.name = "";
      this.closeModalStatus();
    },
    openModalStatus() {
      this.visibleStatus = true;
    },
    openModalEditStatuses(statusId) {
      this.currentStatusTaskId = statusId
      this.visibleEditModalStatuses=true;
    },
    closeModalEditStatuses(){
      this.visibleEditModalStatuses=false;
    },
    closeModalStatus() {
      this.visibleStatus = false;
    },
    openModalTask(statusId) {
      this.currentStatusId = statusId;
      this.visibleTask = true;
    },
    openModalEditTask(tasksId,statusId) {
      this.currentStatusTaskId = statusId;
      this.currentTasksId=tasksId
      this.visibleEditModalTask=true;
    },
    closeEditModalTask(){
      this.visibleEditModalTask=false;
    },
    closeModalTask() {
      this.visibleTask = false;
    },

    pushBoard(){
      this.$router.push('/auth/board');
    },

    pushAuth(){
      this.$router.push('/auth');
    }
  },
});
</script>


<style >
.molal_board {
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(255 255 255 / 33%);
    backdrop-filter: blur(15px);
}
.task-item {
  background-color: #f4f2ff;
  border-radius: 10px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.task-item__info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title_task {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button_delete--add {
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button_delete--add:hover {
  cursor: pointer;
  opacity: 0.5;
}

.button_edit--add {
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button_edit--add:hover {
  cursor: pointer;
  opacity: 0.5;
}

.task-item__comlex_conteiner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task-item__complexity {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.complexity__dot {
  width: 24px;
  height: 12px;
  flex-shrink: 0;
  background-color: #d9d9d9;
  border-radius: 0px 10px 10px 24px;
  display: inline-block;
  margin-right: 5px;
}

.complexity__dot--medium {
  background-color: #fde047;
}

.complexity__dot--high {
  background-color: #e42c5f;
}

.complexity__dot--low {
  background-color: #2ce49d;
}

.complexity__dot--done {
  background-color: #2d41a7;
}

.task-item__title {
  flex-grow: 1;
  font-weight: 600;
  color: #333;
}

.task-item__description {
  color: gray;
  font-size: 12px;
  margin: 10px 0;
}

.task-item__client {
  font-size: 14px;
  color: #4f46e5;
  text-align: center;
}

.container_status {
  display: flex;
  padding: 40px;
  max-width: 180px;
  align-items: flex-start;
  gap: 40px;
  margin: 10px 0;
}

.kanban_column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0;
  padding: 14px;
  border-radius: 12px;
  background-color: #cfc7f0;
}

.kanban_footer {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  width: 100%;
}

.add_task {
  color: #0a090f;
  background-color: #d7cde0;
  border-radius: 5px;
  font-size: 13px;
  border-radius: 0px 0px 7px 0px;
  font-style: normal;
  font-weight: 600;
  padding: 2px;
}

.add_task:hover {
  background-color: #218838;
}

.patch_task {
  color: #0a090f;
  background-color: #d7cde0;;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 2px;
}

.patch_task:hover {
  background-color: #d7cde0;;
}

.delete_task {
  color: #0a090f;
  background-color: #d7cde0;
  border-radius: 0px 0px 0px 7px;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 2px;
}

.delete_task:hover {
  background-color: #a85f5f;
}

.kanban__header {
  display: flex;
  justify-content: center;
  width: 100%;
}

.kanban__header-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.kanban__title {
  color: #22202a;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 100%;
}

.kanban__icon--add:hover {
  cursor: pointer;
  opacity: 0.5;
}

.kanban__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.form {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
}

input[type="text"],
textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

textarea {
  resize: vertical;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #2d41a7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: darkblue;
}
.title_header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.title_container {
  color: #0a090f;
  text-align: center;
  margin: 15px;
}
.main_container_status {
width: 100%;
  padding: 0 15px;
  margin: 0 auto;
}
.add-board-button {
  padding: 10px 20px;
  display: inline-block;
  max-width: 15vh;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
}
.add-board-button:hover {
  background-color: #218838;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.add-board-button:active {
  background-color: #1e7e34;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.add-board-button:focus {
  outline: 2px solid #155724;
}

.out_button {
  padding: 10px 20px;
  display: inline-block;
  max-width: 15vh;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: #cf352a;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
}

.out_button:hover {
  background-color: #882d21;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.out_button:active {
  background-color: #cd411d;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.out_button:focus {
  outline: 2px solid #b72312;
}

.out_button_board {
  padding: 10px 20px;
  display: inline-block;
  max-width: 15vh;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: #ebc82b;
  color: white;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
}

.out_button_board:hover {
  background-color: #d9b524;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.out_button_board:active {
  background-color: #b9a80c;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.out_button_board:focus {
  outline: 2px solid #e6c004;
}

</style>