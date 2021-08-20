import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainFile = () => {

    const [title, setTitle] = useState();
    const [body1, setBody1] = useState();

    const [jdata, setJdata] = useState([]);

    const [Etitle, setEtitle] = useState();
    const [Ebody1, setEbody1] = useState();


    const [index1, setIndex1] = useState();





    const handleSubmit = (e) => {
        setTitle(title);
        setBody1(body1);
        e.preventDefault();

        
            axios.post("https://jsonplaceholder.typicode.com/posts", {

                title: title,
                body: body1

        })
            .then(function (response) {
                return response
            })
            .then(function (data) {
                // console.log(data.data)
                setJdata((oldItems)=>{
                    return [...oldItems,data.data]
                })

            })   
        


        const modalclose = document.getElementById('closeModel');
        modalclose.click();

    }

useEffect(() => {
 



    //Fetch  Automatically 
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(function (response) {
      

    setJdata(response.data)

    })
    .catch(function (error) {
      // handle errorl
 
    })
    .then(function () {
      
    });
    //Fetch Data Automatically


}, [])

    const editFunc = (index) => {
        // console.log(index)
        const tempTitle = jdata;


        

        // console.log(tempTitle)
        
    
    }



//Delete Actual Function      
    const deleteFunc = (index) => {
        // console.log("from Delete "+index)

        axios.delete(`https://jsonplaceholder.typicode.com/posts/`+index, {
          
          }) 
          .then(function (response) {

        //    console.log(jdata[index])
           const id = index;

           setJdata((oldItems)=>{
                return oldItems.filter((arrElem, index) => {
                    return index !==id;
                })
           })
           
            })
            .catch(function (error) {
              // handle errorl
         
            })
            .then(function () {
              
            });

    }
//Delete Actual Function


const editFunc1=(index) => {
    // console.log(index)
    setIndex1(index);
}

    //Edit Section Actually

    const handleEdit = (e) => {
       
       e.preventDefault();

       const index=index1;

        axios.put('https://jsonplaceholder.typicode.com/posts/'+index, {
            title: title,
            body: body1
          })
          .then(function (response) {
            return response
        })
        .then(function (data) {
            console.log(data.data.title)
            console.log(jdata[index].title)

            const tempJdata = jdata;

            // console.log(tempJdata[index])

            tempJdata[index].title = data.data.title
            tempJdata[index].body = data.data.body


            // setJdata(tempJdata)

            setJdata((oldItems)=>{
                return oldItems.map((arrElem, index) => {
                    return arrElem
                })
           })

        }) 



        const modalclose1 = document.getElementById('editDhokla');
        modalclose1.click();
        
    
 
    }

    return (
        <>


            <button className="btn btn-primary btn-sm form-control mt-5 mb-5" data-target="#modalEdit" data-toggle="modal">ADD</button>

            <div className="modal" id="modalEdit">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Add</h3>
                            <button type="button" id="closeModel" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">

                            <form onSubmit={e => { handleSubmit(e) }}>
                                <div class="form-group">
                                    <label for="title">Title</label>
                                    <input type="text" name="title" class="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} />
                                </div>

                                <div class="form-group">
                                    <label for="body">Body</label>
                                    <input type="text" name="body1" class="form-control" id="body" placeholder="Body" value={body1} onChange={e => setBody1(e.target.value)} />
                                </div>

                 <button type="submit" class="btn btn-primary form-control">Submit</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

            {/* //display that data */}


            <div className="container">
                <table class="table">
                    <thead>
                        <tr>

                            <th scope="col">id</th>
                            <th scope="col">title</th>
                            <th scope="col">Image</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            jdata.map((value1, index) => {
                                // {console.log(index + 1)}
                                // {console.log(value1.title)}
                                // {console.log(value1.body)}
                                return<>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{value1.title}</td>
                                    <td>{value1.body}</td>
                                    <td><button className="btn btn-info btn-sm" data-target="#modalEditForm" data-toggle="modal" onClick={() => { editFunc1(index) }}>Edit</button></td>
                                    <td><button className="btn btn-danger btn-sm" onClick={() => { deleteFunc(index) }}>Delete</button></td>
                                </tr>
                                </>
                              })

                        }

                    </tbody>
                </table>

            {/* EDIT START MODEL */}
            <div className="modal" id="modalEditForm">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3> Edit Your Data </h3>
                            <button type="button" class="close" id="editDhokla" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">

                            <form onSubmit={e => { handleEdit(e) }}>
                                <div class="form-group">
                                    <label for="title">Title</label>
                                    <input type="text" name="title" class="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter title" value={Etitle} onChange={e => setTitle(e.target.value)} />
                                </div>

                                <div class="form-group">
                                    <label for="body">Body</label>
                                    <input type="text" name="body1" class="form-control" id="body" placeholder="Body" value={Ebody1} onChange={e => setBody1(e.target.value)} />
                                </div>

                                <button type="submit" class="btn btn-primary form-control"  >Edit </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

            {/* EDIT END MODAL */}





            </div>




            {/* display that data */}
        </>
    )

    

}
export default MainFile