package com.example.Course.Registration.Project.Controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Course.Registration.Project.Service.CourseService;
import com.example.Course.Registration.Project.model.Course;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://127.0.0.1:5500", "http://localhost:5173", "http://localhost:5174", "https://shopkart-enqf.onrender.com", "https://shopkart-frontend-clone.onrender.com"}, allowCredentials = "true")
public class CourseController {

    @Autowired
    CourseService courseService;

        @GetMapping("/courses")
        public List<Course> availableCourses(){
            return courseService.availableCourses();
        }



        @PostMapping("/register")
    public String enrollStudent(@RequestBody CourseRegistrationRequest request){
            courseService.enrolledStudent(request.getName(), request.getEmailId(), request.getCourseName());
            return "Congratulations "+request.getName() +" Enrollment Sucessful "+request.getCourseName();
        }


}

// Request class for course registration
class CourseRegistrationRequest {
    private String name;
    private String emailId;
    private String courseName;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }
}
