<template>
  <header-component>
    <button @click="pushAuth" class="out_button">выйти</button>
    <button @click="openModal" class="add-board-button">создать</button>
  </header-component>
  <main class="container">
    <div class="title_header">
      <h2 class="title_container">cписок досок</h2>
    </div>
    <div class="container_board">
      <div
        class="board-item"
        v-for="item in boardList"
        :key="item.id"

      >
        <div class="board-item_info">
          <div class="title_board">
            <h3>{{ item.name }}</h3>
          </div>
          <div>{{ item.description }}</div>
          <div class="kanban_footer">
            <button @click="deleteBoardHandler(item.id)" class="delete_task">удалить</button>
            <button @click="openEditModal(item.id)" class="patch_task" >изменить</button>
            <button @click="pushTask(item.id)" class="add_task" >к задачам</button>
          </div>
        </div>
      </div>
    </div>
<edit-modal-board v-if="editModalvisible" >
  <div class="form">
        <input
          v-model="name"
          type="text"
          name="title"
          placeholder="Введите название доски"
        />
        <textarea
          v-model="descripton"
          name="description"
          placeholder="Введите описание доски"
        ></textarea>
        <button @click="editBoardHandler">Отправить</button>
        <button type="button" class="cancel-button" @click="closeEditModal ">
          Отмена
        </button>
      </div>
</edit-modal-board>


    <modal-board v-if="visible" @closeModal="closeModalBoard">
      <div class="form">
        <input
          v-model="name"
          type="text"
          name="title"
          placeholder="Введите название доски"
        />
        <textarea
          v-model="descripton"
          name="description"
          placeholder="Введите описание доски"
        ></textarea>
        <button @click="addBoardHandler">Отправить</button>
        <button type="button" class="cancel-button" @click="closeModal">
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
import EditModalBoard from "@/component/HeaderComponent.vue";
import HeaderComponent from "@/component/HeaderComponent.vue";
import FooterComponent from "@/component/FooterComponent.vue";
import ModalBoard from "@/component/ModalBoard.vue";

export default defineComponent({
  name: "TheBoard",

  components: {
    EditModalBoard,
    HeaderComponent,
    FooterComponent,
    ModalBoard,
  },

  data() {
    return {
      currenEditBoardId: null,
      currentBoardId: null,
      name: null,
      descripton: null,
      visible: false,
      editModalvisible: false,
    };
  },

  computed: {
    ...mapGetters({
      boardList: "boardsStore/getBoards",
      boardId: "boardsStore/getBoardById",
    }),
  },

  async created() {
    await this.initBoards();
  },

  methods: {
    openEditModal(boardId) {
      this.currenEditBoardId = boardId;
      this.editModalvisible =true;
    },
    editModal() {
      this.visible = true;
    },

    closeEditModal (){
      this.editModalvisible =false;
    },

    openModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },

    ...mapActions({
      initBoards: "boardsStore/initBoards",
      addBoard: "boardsStore/addBoard",
      editBoard: "boardsStore/editBoard",
      deleteBoard: "boardsStore/deleteBoard",
    }),

    async deleteBoardHandler(boardId) {
      this.currentBoardId=boardId
      await this.deleteBoard({currentBoardId:boardId});
    },


    async addBoardHandler() {
      const params ={
        boardId:this.currenEditBoardId,
        formData: {
          name: this.name,
          description: this.descripton,
        }
      };
      await this.addBoard(params);
      this.name = "";
      this.description = "";
      this.visible = false;
      this.closeEditModal();
    },



    async addBoardHandler() {
      await this.addBoard({
        formData: {
          name: this.name,
          description: this.descripton,
        },
      });
      this.name = "";
      this.description = "";
      this.visible = false;
    },

    async editBoardHandler() {
      await this.editBoard({
        formData: {
          boardId: this.boardId,
          name: this.name,
          description: this.description,
        },
      });

      this.name = "";
      this.description = "";
      this.boardId = "";
    },
    pushAuth(){
      this.$router.push('/auth');
    },

    pushTask(id) {
      this.$router.push({ path: `/auth/board/${id}` });
    },
  },
});
</script>

<style>
.board-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
    flex: 1 0 0;
    padding: 14px;
    max-width: 30vh;
    min-height: 30vh;
    border-radius: 12px;
    background-color: #f9df9eb8;
}

/* .board-item_info {
  display: flex;
  align-items: center;
  justify-content: space-between;
} */

.title_board {
  display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
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

.form {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
}

input[type="text"],
input[type="date"],
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
.container_board {
    display: flex;
    padding: 40px;
    align-items: flex-start;
    gap: 40px;
    margin: 10px 0;
}
.main_container_board {
  display: wrap;
  box-sizing: border-box;
  padding: 40px;
  max-width: 80%;
  height: 550px;
  align-items: flex-start;
  background: #f4f6f8;
  border-radius: 12px;
  gap: 40px;
  margin: 10px 0;
}
.kanban_footer {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-start;
  width: 100%;
}

.add_task {
  color: #0a090f;
  background-color: #ffffff;
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
  background-color: #ffffff;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 2px;
}

.patch_task:hover {
  background-color: #d6cd85;
}

.delete_task {
  color: #0a090f;
  background-color: #ffffff;
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
</style>