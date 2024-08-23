document.addEventListener('DOMContentLoaded', () => {
    const workoutList = document.getElementById('workout-list');
    const planList = document.getElementById('plan-list');


    //fetch
    function fetchWorkouts() {
        fetch('http://localhost:3000/workouts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                data.forEach(workout => {
                    displayWorkout(workout);
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    //display
    function displayWorkout(workout) {
        const li = document.createElement('li');
        li.innerHTML = 

        `
            <img src="${workout.image}" alt="${workout.name}" class="workout-image"></img> 
            <strong>${workout.name}</strong>
            <p>${workout.description}</p>
            <button class="view-details" data-id="${workout.id}">View Details</button>
            <button class="add-to-plan" data-id="${workout.id}">Add to Plan</button>
        `;
        workoutList.appendChild(li);
    }

    //view details
    function viewDetails(id) {
        fetch(`http://localhost:3000/workouts/${id}`)
            .then(response => response.json())
            .then(workout => {
                alert(`
                    Name: ${workout.name}
                    Description: ${workout.description}
                    Instructions: ${workout.instructions}
                `);
            });
    }

    //add to plan 
    function addToPlan(id) {
        fetch(`http://localhost:3000/workouts/${id}`)
            .then(response => response.json())
            .then(workout => {
                displayPlanWorkout(workout);
            });
    }

    //display plan worktout 
    function displayPlanWorkout(workout) {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${workout.image}" alt="${workout.name}" class="workout-image">
        <div>
            <strong>${workout.name}</strong>
            <p>${workout.description}</p>
            <button onclick="viewDetails(${workout.id})">View Details</button>
            <button onclick="addToPlan(${workout.id})">Add to Plan</button>
        </div>
    `;

    li.addEventListener('mouseover', () => {
        viewDetails(workout.id);
    });
    
        planList.appendChild(li);
    }

    //remove plan 
    function removeFromPlan(id) {
        const workoutItem = document.querySelector(`button[data-id="${id}"].remove-from-plan`).parentElement;
        workoutItem.remove();
    }

    //workoutlist 
    workoutList.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-details')) {
            const id = event.target.getAttribute('data-id');
            viewDetails(id);
        } else if (event.target.classList.contains('add-to-plan')) {
            const id = event.target.getAttribute('data-id');
            addToPlan(id);
        }
    });

    //planlist
    planList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-plan')) {
            const id = event.target.getAttribute('data-id');
            removeFromPlan(id);
        }
    });

    fetchWorkouts();
});




