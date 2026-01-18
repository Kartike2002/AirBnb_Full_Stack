const express = require('express');
const app = express();
const mongoose = require('mongoose');
const listing = require('./models/listing.js');
const path = require("path");


const mongoURI = 'mongodb://localhost:27017/mydatabase';

main()
.then(()=>{
    console.log('Connected to MongoDB');

})
.catch((err) =>{
    console.log(err);
});



async function main(){
    await mongoose.connect(mongoURI);
}


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.set("view engine" , "ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}));

// Index Route
app.get('/listings', async (req, res) => {
    const allListings = await listing.find({});
    res.render("listings/index.ejs", { allListings });
});


//Show Route

app.get('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

 




// app.get('/testListing' , async (req, res) => {
//     let sampleListing = new Listing({
//         title: "Sample Listing",
//         description: "This is a sample listing.",
//         image: "default link",
//         price: 100,
//         location: "Sample Location",
//         country: "Sample Country"
//     });
//     await sampleListing.save();
//     console.log('Sample listing saved to database');
//     res.send(sampleListing);
// });

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

