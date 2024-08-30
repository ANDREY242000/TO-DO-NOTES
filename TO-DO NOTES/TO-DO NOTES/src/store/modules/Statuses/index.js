import axios from 'axios';
import { getUserToken } from '../../../Constant'


const statusesStore = {

    namespaced: true,
    state: {
        statuses: []
    },

    getters: {
        getStatuses(state) {
            return state.statuses
        },
        getStatusesById: (state) => (statusesId) => {
            return state.statuses.find(s => Number(s.id) === Number(statusesId));
        },

    },
    mutations: {
        setStatuses(state, value) {
            state.statuses = value;
        },
    },

    actions: {


        async deleteStatuses(store, value) {
            try {
                const response = await axios.delete(`https://todo-list.edu-playground.ru/api/v1/boards/${value.boardId}/statuses/${value.currentStatusId}`, {
                    headers: {
                        'X-Base-Auth': getUserToken()
                    }
                });


                if (response) {
                    await statusesStore.actions.initStatuses(store, value.boardId);
                }
            } catch (e) {
                console.log(e);
            }
        },



        async initStatuses({ commit }, boardId) {
            try {
                const response = await axios.get(`https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/statuses`, {
                    headers: {
                        'X-Base-Auth': getUserToken()
                    }
                });
                commit('setStatuses', response?.data);
            } catch (e) {
                console.log(e);
            }
        },

        async addStatuses(store, statusesData) {
            try {
                const boardId = statusesData.boardId;
                delete statusesData.boardId

                const response = await axios.post(`https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/statuses`, statusesData, {
                    headers: {
                        'X-Base-Auth': getUserToken()
                    }
                });
                if (response) {
                    await statusesStore.actions.initStatuses(store, boardId);
                }
            } catch (e) {
                console.log(e);
            }
        },

        async editStatuses(store, statusesData) {

            const statusesId = statusesData.statusesId;
            delete statusesData.statusesId;

            const boardId = statusesData.boardId;
            delete statusesData.boardId;

            try {
                const response = await axios.put(`https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/statuses/${statusesId}`, statusesData, {
                    headers: {
                        'X-Base-Auth': getUserToken()
                    }
                });

                if (response) {
                    await statusesStore.actions.initStatuses(store, boardId);
                }

            } catch (e) {
                console.log(e);
            }
        }

    }



}
export default statusesStore;