import { createStore } from "vuex";
import boardsStore from "./modules/Boards/index";
import statusesStore from "./modules/Statuses/index";
import tasksStore from "./modules/Tasks/index";

const store = createStore({
    modules: {
        boardsStore,
        statusesStore,
        tasksStore
    },
});

export default store;
