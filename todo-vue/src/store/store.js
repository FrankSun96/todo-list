import Vue from 'vue'
import Vuex from  'vuex'
import db from '../firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    filter: 'all',
    todos: []
  },
  getters: {
    remaining(state) {

      return state.todos.filter(todo => !todo.completed).length
    },
    anyRemaining(state, getters) {
      return getters.remaining !== 0;
    },
    todosFiltered(state) {
      if(state.filter === 'all') {
        return state.todos;
      } else if(state.filter === 'active') {
        return state.todos.filter(todo => !todo.completed)
      } else if(state.filter === 'completed') {
        return state.todos.filter(todo => todo.completed)
      }
    },
    showClearCompletedbButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0;
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false
      });
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
    updateFilter(state, filter){
      state.filter = filter
    },
    checkAll(state, checked){
      state.todos.forEach(todo => todo.completed = checked);
    },
    deleteTodo(state, index){
      state.todos.splice(index, 1)
    },
    updateTodo(state, todo){
      const index = todo.index
      state.todos.splice(index, 1, {
        'id': todo.id,
        'title': todo.title,
      })
    },
    retrieveTodos(state, todos){
      state.todos = todos
    }
  },
  actions: {
    retrieveTodos(context){
      db.collection('todos').get()
        .then(querySnapshot => {
          let tempTodos = []
          querySnapshot.forEach(doc => {
            const data = {
              id: doc.id,
              title: doc.data().title,
              completed: doc.data().completed,
              timestamp: doc.data().timestamp
            }
            tempTodos.push(data)
          })

          const tempTodosSorted = tempTodos.sort((a, b) => {
            return a.timestamp.seconds - b.timestamp.seconds
          })

          context.commit('retrieveTodos', tempTodosSorted)
        })
    },
    addTodo(context, todo) {
      db.collection('todos').add({
        title: todo.title,
        completed: false,
        timestamp: new Date()
      })
        .then(docRef => {
          context.commit('addTodo', {
            id: docRef.id,
            title: todo.title,
            completed: false
          })
        })
    },
    clearCompleted(context) {
      context.commit('clearCompleted')
    },
    updateFilter(context, filter){
      context.commit('updateFilter', filter)
    },
    checkAll(context, checked){
      context.commit('checkAll', checked)
    },
    deleteTodo(context, index){
      db.collection('todos').doc(id).delete()
        .then(() => {
          context.commit('deleteTodo', index)
        })

    },
    updateTodo(context, todo) {
      db.collection('todos').doc(todo.id).set({
        id: todo.id,
        title: todo.title,
        completed: false,
        timestamp: new Date()
      })
        .then(() => {
          context.commit('updateTodo', todo)
        })
    }
  }
});
