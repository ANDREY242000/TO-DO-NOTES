import axios from 'axios';
import { getUserToken } from '../../../Constant'


const tasksStore = {

    namespaced: true,
    state: {
        tasks: {}
    },

    getters: {
        getTasks(state) {
            return state.tasks
        },
        getTasksById: (state) => (tasksById) => {
            return state.tasks.find(t => Number(t.id) === Number(tasksById));
        }

    },

    mutations: {
        setTasks(state, value) {
            state.tasks = value;
        },
    },

    actions: {

        async deleteTasks(store, value) {
            try {
                const response = await axios.delete(`https://todo-list.edu-playground.ru/api/v1/boards/${value.boardId}/tasks/${value.currentTasksId}`, {
                    headers: {
                        'X-Base-Auth': getUserToken()
                    }
                });


                if (response) {
                    await tasksStore.actions.initTasks(store, value.boardId);
                }
            } catch (e) {
                console.log(e);
            }
        },



        async initTasks({ commit }, boardId) {
            try {

                const response = await axios.get(`https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/tasks`, {
                    headers: {
                        'X-Base-Auth': getUserToken()
                    }
                });

                console.log('Task', response)

                const result = response?.data.reduce((acc, item) => {
                    const statusId = item.status.id;
                    acc[statusId] = item.tasks;
                    return acc;
                  }, {});

                commit('setTasks', result);
            } catch (e) {
                console.log(e);
            }
        },

        async addTasks(store, tasksData) {
            try {
                const boardId = tasksData.boardId;

                delete tasksData.formData.id;


                const response = await axios.post(`https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/tasks`, tasksData, {
                    headers: {
                        'X-Base-Auth': getUserToken()
                    }
                });
                if (response) {
                    await tasksStore.actions.initTasks(store, boardId);
                }
            } catch (e) {
                console.log(e);
            }
        },

        async editTasks(store, tasksData) {

            const tasksId = tasksData.tasksId;
            delete tasksData.tasksId;

            const boardId = tasksData.boardId;
            delete tasksData.tasksId;

            try {
                const response = await axios.put(`https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/tasks/${tasksId}`, tasksData, {
                    headers: {
                        'X-Base-Auth': getUserToken()
                    }
                });

                if (response) {
                    await tasksStore.actions.initTasks(store,boardId);
                }

            } catch (e) {
                console.log(e);
            }
        }

    }



}
export default tasksStore;