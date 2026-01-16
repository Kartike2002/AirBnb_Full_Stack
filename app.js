const express = require('express');
const app = express();
const mongoose = require('mongoose');
const listing = require('./models/listing.js');


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

app.get('/testListing' , async (req, res) => {
    let sampleListing = new Listing({
        title: "Sample Listing",
        description: "This is a sample listing.",
        image: "default link",
        price: 100,
        location: "Sample Location",
        country: "Sample Country"
    });
    await sampleListing.save();
    console.log('Sample listing saved to database');
    res.send(sampleListing);
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

