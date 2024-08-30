import axios from "axios";
import { getUserToken, getUserId } from "../../../Constant";

const boardsStore = {
    namespaced: true,
    state: {
        boards: []
    },
    getters: {
        getBoards(state) {
            return state.boards;
        },
        getBoardById: (state) => (boardId) => {
            return state.boards.find(b => Number(b.id) === Number(boardId));
        }
    },
    mutations: {
        setBoards(state, value) {
            state.boards = value;
        },
        addBoard(state, value) {

            state.boards.push(value);
        }
    },
    actions: {

        async deleteBoard(store, value) {
            try {
                const response = await axios.delete(`https://todo-list.edu-playground.ru/api/v1/user/${getUserId()}/boards/${value.currentBoardId}`, {
                    headers: {
                        'X-Base-Auth': getUserToken()
                    }
                });

                if (response) {
                    await boardsStore.actions.initBoards(store,value.boardId);
                }
            } catch (e) {
                console.log(e);
            }
        },

        async initBoards({ commit }) {
            try {
                const response = await axios.get(`https://todo-list.edu-playground.ru/api/v1/user/${getUserId()}/boards`, {
                    headers: {
                        'X-Base-Auth': getUserToken()
                    }
                });

                commit('setBoards', response?.data);
            } catch (e) {
                console.log(e);
            }
        },

        async addBoard(store, boardData) {
            try {
                const response = await axios.post(`https://todo-list.edu-playground.ru/api/v1/user/${getUserId()}/boards`, boardData, {
                    headers: {
                        'X-Base-Auth': getUserToken()
                    }
                });
                if (response) {
                    await boardsStore.actions.initBoards(store);
                }
            } catch (e) {
                console.log(e);
            }
        },

        async editBoard(store, boardData) {
            const boardId = boardData.boardId;
            delete boardData.boardId;

            try {
                const response = await axios.put(`https://todo-list.edu-playground.ru/api/v1/user/${getUserId()}/boards/${boardId}`, boardData, {
                    headers: {
                        'X-Base-Auth': getUserToken()
                    }
                });

                if (response) {
                    await boardsStore.actions.initBoards(store,boardId);
                }

            } catch (e) {
                console.log(e);
            }
        }
    }
}

export default boardsStore;