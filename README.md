# PersonalSaltSocialMedia

A robust, feature-rich Social Media Backend inspired by **Threads**, built with **Spring Boot** and **MySQL**. This project demonstrates a deep understanding of complex data relationships, user personalization, and real-time interaction flows in a modern MVC environment.

---

## 🛠 Tech Stack & Architecture

*   **Backend:** Java 17, **Spring Boot 3** (REST API)
*   **Data Layer:** **Spring Data JPA** with Hibernate ORM
*   **Database:** **MySQL** for persistent relational storage
*   **Build System:** Maven
*   **Testing:** JUnit 5 & MockMVC for integration testing

---

## ✨ Key Features & Functionality

### 👤 Profile & Identity Management
*   **Dynamic User Profiles:** Beyond simple login, users have dedicated profiles containing bios and personalized data.
*   **Profile Customization:** Fully implemented logic for changing and updating profile pictures and user metadata.

### 🧵 The "Threads" Experience (Messaging & Interaction)
*   **Comprehensive Post Logic:** Full **CRUD** (Create, Read, Update, Delete) functionality for posts.
*   **Nested Commenting System:** A complex interaction model allowing users to leave comments on posts, creating a conversational thread.
*   **Data Relations:** Manages intricate **One-to-Many** and **Many-to-One** relationships between Users, Posts, and Comments.

### 🖼 Media & Integration
*   **Image Handling:** Logic for managing profile images and ensuring the backend serves/updates media correctly.
*   **Frontend Ready:** Clean, documented REST endpoints designed to be consumed by a React or Next.js frontend.

---

## 🚀 Getting Started

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com
    ```
2.  **Database Setup:**
    Configure your MySQL credentials in `src/main/resources/application.properties`:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
    spring.datasource.username=your_username
    spring.datasource.password=your_password
    ```
3.  **Launch:**
    Run the application using Maven:
    ```bash
    mvn spring-boot:run
    ```
4.  **Access:**
    The API will be available at `http://localhost:8080`.

