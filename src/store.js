export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
     contacts:[]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

      case "add_contact":
  return{
    ...store, contacts:[...store.contacts,action.payload]
  };

  case 'set_contacts':
    return {
        ...store, 
        contacts: action.payload // Reemplaza la lista completa en el store
    };
    default:
      throw Error('Unknown action.');
  }    
}
