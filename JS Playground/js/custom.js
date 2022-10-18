var hotel = {
    name: "Quay",
    rooms: 40,
    booked: 25,
    checkAvailability: function() {
        return this.room - this.booked;
    }
};

var elName = document.getElementById('hotelName');
elName.textContent = hotel.name;

var elRooms = document.getElementById('rooms');
elRooms.textContent = hotel.checkAvailability();