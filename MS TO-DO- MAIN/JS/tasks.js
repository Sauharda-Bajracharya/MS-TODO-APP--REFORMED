$(document).ready(function() {
	$("#input input").focus();
	
	if(localStorage.getItem("first") === null){
		var exampleTasks = [
			"Test 1",
			"Test 2",
			"Test 3",
			"Test 4",
			"Test 5"
		];
		localStorage.setItem("tasks", JSON.stringify(exampleTasks));
		localStorage.setItem("first", "0");
	}
	
	var storedTasks = JSON.parse(localStorage.getItem("tasks"));
	for (i = 0; i < storedTasks.length; i++) {
		$("ol").append(createTask(storedTasks[i]));
	}
	$("li.task").show();
	storeData();
});

function createTask(taskText) {
	return $('<li class="task">' +
					 '<p title="' + taskText + '">' + taskText + '</p>' +
					 '<input type="text" class="editable" value="' + taskText + '">' +
					 '<div class="button-wrap">' +
					 '<button title="Complete" class="complete"><i class="fa fa-check" aria-hidden="true"></i></button>' +
					 '<button title="Edit" class="edit"><i class="fa fa-pencil" aria-hidden="true"></i></button>' +
					 '<button title="Delete" class="delete"><i class="fa fa-trash" aria-hidden="true"></i></button>' +
					 '<button title="Save" class="save"><i class="fa-regular fa-floppy-disk" aria-hidden="true"></i></button>' +
					 '<button title="Cancel" class="cancel"><i class="fa fa-times" aria-hidden="true"></i></button>' +
					 '</div></li>').hide();
};

$("#add-task").click(function() {
	if ( !$("#input input").val() ) {
		error("Invalid Input.");
	} else {
		$("#error").removeClass("active");
		var newTask = createTask($("#input input").val());
		$("#tasks ol").append(newTask);
		newTask.slideDown();
		$("#input input").val('');
		$("#input input").focus();
		storeData();
	}
});

$("#tasks ol").on("click", ".complete", function() {
  $(this).parents("li.task").toggleClass("test-completed");
  storeData();
});

$("#tasks ol").on("click", ".delete", function() {
	$(this).parents("li.task").animate({
		opacity: 0,
		// left: '200px'
	}, 150, 'linear', function() {
		$(this).remove();
		storeData();
	});
});

$("#tasks ol").on("click", ".edit", function() {
	$(this).closest("li.task").find("p").css("display", "none");
	$(this).closest("li.task").find(".editable").css("display", "block");
	$(this).closest("li.task").find(".editable").focus().val('').val($(this).closest("li.task").find("p").html());
	$(this).parent().find("button").css("display", "none");
	$(this).parent().find(".save, .cancel").css("display", "inline-block");
});

$("#tasks ol").on("click", ".save", function() {
	$(this).closest("li.task").find("p").html($(this).closest("li.task").find(".editable").val());
	$(this).closest("li.task").find(".editable").css("display", "none");
	$(this).closest("li.task").find("p").css("display", "inline-block");
	$(this).parent().find("button").css("display", "inline-block");
	$(this).parent().find(".save, .cancel").css("display", "none");
	storeData();
});

$("#tasks ol").on("click", ".cancel", function() {
	$(this).closest("li.task").find(".editable").css("display", "none");
	$(this).closest("li.task").find("p").css("display", "inline-block");
	$(this).parent().find("button").css("display", "inline-block");
	$(this).parent().find(".save, .cancel").css("display", "none");
});

$("#input input").keypress(function(event) {
	if (event.which === 13) {
		$("#add-task").click();
	}
});

function storeData() {
	localStorage.removeItem("tasks");
	var tasksArray = [];
	$("li.task p").each(function() { tasksArray.push($(this).html()) });
	localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

function error(message) {
	$("#error").html(message);
	$("#error").addClass("active");
};

// Function to update recent completed tasks in the HTML
function updateRecentCompletedTasks(completedTasks) {
	for (let i = 0; i < completedTasks.length; i++) {
	  $("#completedTask" + (i + 1)).text(completedTasks[i]);
	}
  }
  
  // Function to store the completed tasks in localStorage
  function storeCompletedTasks(completedTasks) {
	localStorage.setItem("recentCompletedTasks", JSON.stringify(completedTasks));
  }
  
  // Load stored tasks on page load
  $(document).ready(function() {
	let storedCompletedTasks = localStorage.getItem("recentCompletedTasks");
	if (storedCompletedTasks) {
	  completedTasks = JSON.parse(storedCompletedTasks);
	  updateRecentCompletedTasks(completedTasks);
	}
  });
  
  // Complete a task
  $("#tasks ol").on("click", ".complete", function() {
	var completedTask = $(this).parents("li.task").find("p").text();
	$(this).parents("li.task").toggleClass("test-completed");

	console.log("Completed Task:", completedTask);
  
	let storedCompletedTasks = localStorage.getItem("recentCompletedTasks");
	if (storedCompletedTasks) {
	  completedTasks = JSON.parse(storedCompletedTasks);
	}
  
	completedTasks.unshift(completedTask); 
	completedTasks = completedTasks.slice(0, 3); 
  
	updateRecentCompletedTasks(completedTasks);
	storeCompletedTasks(completedTasks);
  
	$(this).parents("li.task").toggleClass("test-completed");
  });

// Function to get the current date in a formatted string
function getCurrentDate() {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Update the current date under "My Day" heading
document.getElementById('currentDate').textContent = getCurrentDate();
