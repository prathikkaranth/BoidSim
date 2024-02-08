class Boid {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.r = 2.0;
        this.maxForce = 0.05;
        this.maxSpeed = 3;
    }

    edges() {
        if(this.position.x > width) {
            this.position.x = 0;
        } else if(this.position.x < 0) {
            this.position.x = width;
        }
        if(this.position.y > height) {
            this.position.y = 0;
        } else if(this.position.y < 0) {
            this.position.y = height;
        }
    }

    align(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for(let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if(d < perceptionRadius && other != this) {
                steering.add(other.velocity);
                total++;
            }
            
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed); 
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for(let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if(d < perceptionRadius && other != this) {
                steering.add(other.position);
                total++;
            }
            
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position); 
            steering.setMag(this.maxSpeed);           
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    seperation(boids) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for(let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if(d < perceptionRadius && d > 0) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d);
                steering.add(diff);
                total++;
            }
            
        }
        if (total > 0) {
            steering.div(total); 
            steering.setMag(this.maxSpeed);           
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    flock(boids) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let seperation = this.seperation(boids);

        seperation.mult(seperationSlider.value());
        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());

        this.acceleration.add(seperation);
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
    }


    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

    show() {
        // stroke(255);
        // strokeWeight(8);
        // point(this.position.x, this.position.y);  
        let theta = this.velocity.heading() + PI / 2;
        fill(127);
        stroke(200);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
               
    }
}