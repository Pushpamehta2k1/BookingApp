1. Project Title & Description - 
    - MEETING ROOM BOOKING APP
    - A full-stack web application that allows users and admins to book conference rooms based on available time slots. The system prevents double booking and sends email confirmations on successful booking, updates, and cancellations.

2. Team Details
    - Team - tech Titans
    - Members 
    - Naresh Singh Mahara/Naresh.mahara@anudip.org
    - Chetan Kashyap/Yallan0311@gmail.com
    - Pushpa Mehta/mehtapushpa2k1@gmail.com
      
3.Tech Stack 

    - Backend
        Java 17
        Spring Boot
        Spring Security (JWT)
        Hibernate & JPA
        MySQL
        JavaMailSender

    - Frontend
        React.js
        Axios
        React Router
        React DatePicker
        Moment.js

4. Project Description 
        Register and Login (JWT Auth)
        View all rooms with details and images
        Book a room by selecting check-in date and time slots
        Check existing bookings for that room and date
        Get instant booking confirmation with unique code
        Receive email confirmation on booking
        Update or cancel own bookings
        🛠 Admin Features
        View all bookings
        Cancel any user’s booking
        View booked time slots for any room and date
        Manage users and roles (if extended)

    ----------------------------- 📅 Time Slot Management -----------------------------
    Each day is divided into 30-minute slots (e.g., 08:00–08:30, 08:30–09:00)
    Users can select a range of slots (start time to end time)
    Already booked slots are disabled
    Prevents overlapping bookings
    is_booked flag updated automatically based on presence in booking_time_slot table
    -----------------------------  📨 Email Notifications -----------------------------
    Booking Confirmation – sent when a user books a room
    Booking Update – sent after booking is updated
    Booking Cancellation – sent if admin or user cancels the booking

     -----------------------------  🔐 Authentication -----------------------------
    JWT-based secure login system
    Role-based access control:
    USER – book/manage own bookings
    ADMIN – manage all bookings

    ----------------------------- Setup Introduction -----------------------------

                        ⚙️ How to Run the Project & Set up Manually 

    --🛠 Backend (Spring Boot)--
    Configure your application.properties:
    spring.datasource.url=jdbc:mysql://localhost:3306/conference_booking
    spring.datasource.username=root
    spring.datasource.password=yourpassword

    spring.mail.host=smtp.gmail.com
    spring.mail.port=587
    spring.mail.username=youremail@gmail.com
    spring.mail.password=your-app-password
    spring.mail.properties.mail.smtp.auth=true
    spring.mail.properties.mail.smtp.starttls.enable=true


    cd backend
    ./mvnw spring-boot:run

    --Frontend (React.js)--
    cd frontend
    npm install
    npm start

5. ------------------------- Setup Introduction  -----------------------------
    Follow the steps below to set up and run the Conference Room Booking App locally:
        Prerequisites:
        Node.js (v18 or above)
        npm or yarn
        Git installed
        (Optional) MySQL or MongoDB if using backend with database
    1. Clone the Repository
        in Terminal type
        git clone https://github.com/your-Pushpamehta2k1/BookingApp.git
        cd conference-room-booking-app
    2. Install Dependencies
        npm install
        # or
        yarn install
    3. Environment Variables
        Create a .env file in the root directory and add necessary variables (example below):
        env
        REACT_APP_API_BASE_URL=http://localhost:7070/api
        If backend is included, add DB config, secret keys, etc.
    4. Run the App
        To start the frontend:
        npm start
        # or
        yarn start
        (Optional) To start the backend (if separate):

        cd backend
        npm install
        npm run dev
    5. Access the Application
        Open your browser and visit:
        http://localhost:7070

6. Usage Guide 

    🏠 Home Page
        Displays the main dashboard with a search form.
        Users can select date, time slot, and capacity to search for available rooms.
    
    🔍 Search & Booking
        Select:Date
        Time Slot (e.g., 10:00 AM – 11:00 AM)
        Click on Search Rooms.
        A list of available conference rooms will be displayed.
        Click Book Now on a room.
        Fill in your name, Time, and purpose of meeting.
        Click Confirm Booking.

    📅 View My Bookings
    Users can view their bookings from the "My Bookings" page (if available).
    Each booking will show:
        Room name
        Date & Time
        Booking status (Confirmed/Pending)

    🛠 Admin Features (if available)
        Login as admin to:
        Add/edit/delete rooms
        View all user bookings
7. API Endpoints / Architecture
📊 System Architecture
    Frontend (ReactJS)
        |
        ↓
    Backend API (Node.js / Express)
        |
        ↓
    Database (MySQL / MongoDB)
    Frontend: React app for users to book rooms.

    Backend: RESTful API built using Node.js/Express.

    ----------------- API Endpoints E.g ------------------------
    -----------------------------------------------------------------------    
    | Method   | Endpoint                  | Description                 |
    | -------- | ------------------------- | --------------------------- |
    | `GET`    | `/api/rooms`              | Get list of all rooms       |
    | `POST`   | `/api/rooms/search`       | Search available rooms      |
    | `POST`   | `/api/bookings`           | Create a new room booking   |
    | `GET`    | `/api/bookings/:id`       | Get booking details by ID   |
    | `GET`    | `/api/bookings/user/:uid` | Get all bookings for a user |
    | `POST`   | `/api/auth/login`         | Login user/admin            |
    | `POST`   | `/api/auth/register`      | Register new user           |
    | `GET`    | `/api/admin/rooms`        | Admin: View all rooms       |
    | `POST`   | `/api/admin/rooms`        | Admin: Add a new room       |
    | `PUT`    | `/api/admin/rooms/:id`    | Admin: Update room details  |
    | `DELETE` | `/api/admin/rooms/:id`    | Admin: Delete room          |

Like we use these approach 
    Database: Stores rooms, users, and bookings (MySQL or MongoDB).
    📊 Database Tables
        user: stores users, roles
        room: stores conference room info
        time_slot: all 30-minute intervals, is_booked flag
        booking: stores booking date, confirmation code, room/user mapping
        booking_time_slot: join table between booking and time_slot

    🔮 Future Improvements
        Admin dashboard UI
        Room filtering (by type, capacity)
        Weekly view calendar for bookings
        Recurring meeting support
        Email templates (HTML-based)

    👨‍💻 Author
        Developed by Yallan
        📬 Email: yallan0311@gmail.com



📘 Entity Relationships

        1. User ↔ Booking
        Relation: One User can have many Bookings
        Type: @OneToMany
        Mapped by: user
        Inverse side: Booking.user

        2. Room ↔ Booking
        Relation: One Room can have many Bookings
        Type: @OneToMany
        Mapped by: room
        Inverse side: Booking.room

        3. Booking ↔ TimeSlot
        Relation: One Booking can have many TimeSlots, and one TimeSlot can be associated with multiple Bookings
        Type: @ManyToMany
        Join Table: booking_time_slot

        4. Room ↔ TimeSlot
        Relation: One Room can have many TimeSlots
        Type: @ManyToOne (each TimeSlot belongs to a Room)
        Used For: Reference purpose (not for booking conflict, which is checked through booking_time_slot)

    8. Licence - No Licence 
     
    -------------------------------------Demo Video LINK --------------------------------
    GOOGLE DRIVE LINK ARE HERE 
        https://drive.google.com/file/d/1MDN_41Nqks1fL3oV_GhkXxBdimKZXaAl/view?usp=drivesdk
        
