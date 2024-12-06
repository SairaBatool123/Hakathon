// ----------------------------------------FIRESTORE ---------------------------------------

import { collection, addDoc, getDocs, db , doc,deleteDoc , getDoc, updateDoc} from "./firebase.js";

let title = document.getElementById("title");
let discription = document.getElementById("description");
// let categories = document.getElementById("categories");


let Utitle = document.getElementById("title");
let Udiscription = document.getElementById("description");
let isEdit = null;

//  ====================ADD=================

const addContent = async () => {
  //  console.log(title.value,discription.value);
  if (title.value !== "" && discription.value !== "") {
    // addBtn.innerHTML = "..."
    Toastify({
      text: `Loading  ⟳`,
      gravity: "top",
      position: "center",
      duration: 3000,
    }).showToast();

    try {
      const docRef = await addDoc(collection(db, "post"), {
        // categories: categories.value,
        title: title.value,
        discription: discription.value,
      });
      console.log("Document written with ID: ", docRef.id);
     getContent();
      // ----------------add kerne k baad bhi or khudi bhi -------------------
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      Swal.fire({
        title: "Success",
        text: "Blog Has Been Added",
        icon: "success",
      });
      console.log("Post Has Been Added");
      
    }
  } else {
    Swal.fire({
      title: "Empty Post",
      text: "Can't publish blog without Title or Description",
      icon: "question",
    });
  }
  title.value = "";
  description.value = "";
};

let addBtn = document.getElementById("Add");
addBtn.addEventListener("click", addContent);

//  ====================Get=================

let allPost = document.getElementById("allPost");
var currentTime = new Date().toLocaleTimeString();
let currentDate = new Date().toLocaleDateString('en-US');
const getContent = async () => {
  allPost.innerHTML="";
  try {
    const querySnapshot = await getDocs(collection(db, "post"));
    querySnapshot.empty;
    querySnapshot.forEach((doc) => {
      const { title, discription } = doc.data();
      allPost.innerHTML += `<div class="time d-flex justify-content-end cardIs">${currentTime} ${currentDate} </div>
        <div class="col-lg-12 card w-100 p-2 mb-2" style="background-color:#f4f4f9;box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
">
          <h2 class="display-5">${title}</h2>
          <p>${discription}</p> <hr>
          <div class="d-flex "><button onclick="editData('${doc.id}')" class="btn btn-primary w-50 postBtn">Update</button> &nbsp;&nbsp&nbsp&nbsp&nbsp
        <button onclick="Delete('${doc.id}')" class="btn btn-primary w-50 postBtn">Delete</button> </div></div>`;
          console.log(doc.data());
          
    });
  } catch (error) {
    console.log(error);
  }
};
getContent();


// //  ====================UPDATE=================
window.editData = async(id,e)=>{
// console.log("Upate" , id);
try {
  let userData = await getDoc(doc(db,"post",id));
  const {title,discription} = userData.data();
  // console.log(title,discription);
  Utitle.value=title;
  Udiscription.value=discription
  // console.log(userData.data(), "Edited Item");
} catch (error) {
  console.log(error);
}
finally{
  Toastify({
    text: `You Can Updated Your Blog Now! ✅`,
    gravity: "top",
    position: "center",
    duration: 3000,
  }).showToast();
}
}


// const UPDATED =async()=>{
//   console.log("Updated from firebase");
//   try {
//     await updateDoc(doc(db,"post",isEdit),{
//       title : Utitle.value,
//       discription:Udiscription.value,
//     });
//     // console.log("Deleted");
//     getContent();
    
//   } catch (error) {
//     console.log(error);
    
//   }
// }
// let UPdated = document.getElementById("UPDATED")
// UPdated.addEventListener('click',EUpdate)


//  ====================DELETE=================
window.Delete=async(id)=>{
  // console.log("Delete" , id);
  try {
    await deleteDoc(doc(db,"post",id));
    console.log("Deleted");
    getContent();
    
  } catch (error) {
    console.log(error);
    
  }
  finally{
    Toastify({
      text: `Delete Successfully ✅`,
      gravity: "top",
      position: "center",
      duration: 3000,
    }).showToast();
  }
}

// Selectors
const categorySelect = document.getElementById("category-select");
const filterBtn = document.getElementById("filter-btn");
const resultsDiv = document.getElementById("results");

// Fetch and display filtered data
const fetchAndDisplayData = async (category) => {
  resultsDiv.innerHTML = "<p>Loading...</p>";

  let q;
  const collectionRef = collection(db, "post");

  // Query based on the selected category
  if (category === "web") {
    q = query(collectionRef); // Fetch all documents
  } else {
    q = query(collectionRef, where("category", "==", category)); // Filter by category
  }

  try {
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (data.length > 0) {
      resultsDiv.innerHTML = data.map(item => `
        <div class="result-item">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <p><strong>Category:</strong> ${item.category}</p>
        </div>
      `).join("");
    } else {
      resultsDiv.innerHTML = "<p>No items found.</p>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    resultsDiv.innerHTML = "<p>Error loading data. Check the console for details.</p>";
  }
};

// Event listener for filter button
filterBtn.addEventListener("click", () => {
  const selectedCategory = categorySelect.value;
  fetchAndDisplayData(selectedCategory);
});

// Initial fetch
fetchAndDisplayData("all");