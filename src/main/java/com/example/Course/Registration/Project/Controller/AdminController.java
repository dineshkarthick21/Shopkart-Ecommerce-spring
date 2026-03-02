package com.example.Course.Registration.Project.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Course.Registration.Project.Service.CourseService;
import com.example.Course.Registration.Project.Service.UserService;
import com.example.Course.Registration.Project.model.Course;
import com.example.Course.Registration.Project.model.CourseRegistry;
import com.example.Course.Registration.Project.model.Users;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "https://shopkart-enqf.onrender.com", "https://shopkart-frontend-clone.onrender.com"}, allowCredentials = "true")
public class AdminController {

    @Autowired
    CourseService courseService;

    @GetMapping("/courses/enrolled")
    public List<CourseRegistry> enrolledStudent(){
        return  courseService.enrolledStudent();
    }
    
    @PostMapping("/courses/add")
    public Course addCourse(@RequestBody Course course) {
        return courseService.addCourse(course);
    }
    
    @GetMapping("/courses")
    public List<Course> getAllCourses() {
        return courseService.availableCourses();
    }
    
    @DeleteMapping("/courses/{courseId}")
    public void deleteCourse(@PathVariable String courseId) {
        courseService.deleteCourse(courseId);
    }
    
    @Autowired
    UserService service;

    @PostMapping("/add-user")
    public void addUSer(@RequestBody Users user){
        service.add(user);
    }


}
