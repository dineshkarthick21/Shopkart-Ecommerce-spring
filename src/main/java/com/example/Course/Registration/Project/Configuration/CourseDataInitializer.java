package com.example.Course.Registration.Project.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.Course.Registration.Project.Repository.CourseRepo;
import com.example.Course.Registration.Project.model.Course;

@Component
public class CourseDataInitializer implements CommandLineRunner {

    @Autowired
    private CourseRepo courseRepo;

    @Override
    public void run(String... args) throws Exception {
        // Only initialize if database is empty
        if (courseRepo.count() == 0) {
            System.out.println("🔄 Initializing sample course data...");
            
            // Sample courses for e-commerce store
            addCourse("PROD001", "Wireless Bluetooth Headphones", "Sony", 5, 
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", 
                "Premium wireless headphones with noise cancellation and 30-hour battery life.", 2999.00);
            
            addCourse("PROD002", "Smart Watch", "Apple", 5, 
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", 
                "Fitness tracker with heart rate monitor and GPS.", 4999.00);
            
            addCourse("PROD003", "Laptop Backpack", "Nike", 4, 
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", 
                "Durable laptop backpack with multiple compartments.", 1499.00);
            
            addCourse("PROD004", "Mechanical Keyboard", "Logitech", 5, 
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500", 
                "RGB mechanical gaming keyboard with customizable keys.", 3499.00);
            
            addCourse("PROD005", "Wireless Mouse", "Logitech", 5, 
                "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500", 
                "Ergonomic wireless mouse with precision tracking.", 899.00);
            
            addCourse("PROD006", "USB-C Hub", "Anker", 4, 
                "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500", 
                "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader.", 1999.00);
            
            addCourse("PROD007", "Portable SSD 1TB", "Samsung", 5, 
                "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500", 
                "Ultra-fast portable SSD with 1TB storage capacity.", 5999.00);
            
            addCourse("PROD008", "Webcam HD", "Logitech", 5, 
                "https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=500", 
                "1080p HD webcam with built-in microphone.", 2499.00);
            
            addCourse("PROD009", "Phone Stand", "Belkin", 4, 
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500", 
                "Adjustable phone stand for desk or nightstand.", 599.00);
            
            addCourse("PROD010", "LED Desk Lamp", "Philips", 5, 
                "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500", 
                "Smart LED desk lamp with adjustable brightness.", 1799.00);
            
            addCourse("PROD011", "Power Bank 20000mAh", "Anker", 5, 
                "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500", 
                "High-capacity power bank with fast charging.", 2199.00);
            
            addCourse("PROD012", "Bluetooth Speaker", "JBL", 5, 
                "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500", 
                "Portable Bluetooth speaker with 12-hour battery life.", 3299.00);
            
            addCourse("PROD013", "Gaming Mouse Pad", "Razer", 4, 
                "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500", 
                "Large RGB gaming mouse pad with smooth surface.", 799.00);
            
            addCourse("PROD014", "Cable Organizer", "Generic", 4, 
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500", 
                "5-pack cable management clips for desk organization.", 299.00);
            
            addCourse("PROD015", "Screen Cleaning Kit", "Whoosh", 4, 
                "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=500", 
                "Non-toxic screen cleaner safe for all devices.", 499.00);

            System.out.println("✅ Sample course data initialized successfully!");
            System.out.println("   Total courses added: " + courseRepo.count());
        } else {
            System.out.println("✓ Course data already exists. Skipping initialization.");
        }
    }
    
    private void addCourse(String id, String name, String trainer, int duration, 
                          String photoUrl, String description, double price) {
        Course course = new Course();
        course.setCourseId(id);
        course.setCourseName(name);
        course.setTrainer(trainer);
        course.setDurationInWeeks(duration);
        course.setPhotoUrl(photoUrl);
        course.setDescription(description);
        course.setPrice(price);
        courseRepo.save(course);
    }
}
