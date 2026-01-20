const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

// Import Model (ONLY ONCE)
const Listing = require("./models/listing");

// MongoDB Connection
const mongoURI = "mongodb://localhost:27017/mydatabase";

async function main() {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
}

main().catch(err => console.log(err));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Home Route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});


// New Route
app.get("/listings/new", async (req, res) => {
    res.render("listings/new.ejs");
});


// Show Route
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

//Create Route

app.post("/listings", async (req, res) => {
    const listingData = req.body.listing;
    await Listing.create(listingData);
    res.redirect("/listings");
});

// Edit Route

app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});


// Update Route
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings/" + id);
});
// Delete Route

app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});




// Server
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
