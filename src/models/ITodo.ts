interface ITodo {
  _id: string;
  name: string;
  completed: boolean;
  __v: number; // this is not necessary for the frontend and can be omitted
}

export default ITodo;
