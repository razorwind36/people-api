import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {

  state = {
    data: [],
    newPerson: {
      name: '',
      age: null,
      height: null
    } 
  }

 getData = async () => {
   try {
     const response = await axios.get('/api/people')
     console.log(response)
     const data = response.data
     this.setState({ data })

   } catch (error) {
     console.log(error)
   }
 }

 postPerson = async (e) => {
   e.preventDefault()

   try {
     const res = await axios.post('/api/people',this.state.newPerson)
     console.log(res)

   } catch (error) {
     console.log(error)
   }
 }

 handleChange = ({ target: { name, value } }) => {
   const data = { ...this.state.newPerson, [name]: value }
   console.log(this.state.newPerson)
   this.setState({ newPerson: data })
 }

 componentDidMount(){
   this.getData()
 }
 

 render() {
   return (
     <div>
       {this.state.data.map((data, index) => (
         <div key={index.toString()}>
           <h3>{ ' name: ' + data.name + ', age: ' + data.age + ', height: '  + data.height}</h3>
           <hr/>
         </div>
       ))}
       <h1>ADD A PERSON</h1>
       <form onSubmit={this.postPerson}>
         <span>Name:<input name='name' onChange={this.handleChange}  type='text'></input></span>
         <span>Age:<input name='age' onChange={this.handleChange}  type='text'></input></span>
         <span>Height:<input name='height' onChange={this.handleChange}  type='text'></input></span>
         <button>Submit Hooman</button>
       </form>
     </div>
   )
 }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)