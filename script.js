document.addEventListener("DOMContentLoaded",()=>{
    //Getting all the elements required
    const expenseForm=document.getElementById('expense-form');
    const expenseList=document.getElementById('expense-list');
    const totalAmount=document.getElementById('total-amount');
    const filterCategory=document.getElementById('filter-category');
    const expenseName=document.getElementById('expense-name');
    const expenseAmount=document.getElementById('expense-amount');
    const expenseCategory=document.getElementById('expense-category');
    const expenseDate=document.getElementById('expense-date');
    let expenses=[]; // not declared as const because arrays declared as const cannot be reassigned

    //submit event in expenseForm
    expenseForm.addEventListener("submit",(e)=>{
        e.preventDefault(); //prevent default refresh
         //Creating an object for each expense
         /*Why it is inside the submit event? because if we have it outside 
         the form hasnt been submitted yet- so all strings will be empty*/
         const expense={
            id: Date.now(),
            name:expenseName.value,
            amount: parseFloat(expenseAmount.value),
            category: expenseCategory.value,
            date: expenseDate.value
        }
        //pushing the entered values for each expense into the expenses array
        expenses.push(expense);
        console.log(expenses);

        //displaying the expenses once they are added
        expensesDisplay(expenses);

        expenseForm.reset();
        updateTotalAmount();
    })

    function expensesDisplay(expenses){
        expenseList.innerHTML="";
        //iterating through the expense object
        expenses.forEach(expense=>{
            //creating a table row element
            const rowElement=document.createElement('tr');
            //accepting values of name,amount, category, date for each expense
            //creating a row of data for each category column and amount fixed to 3 decimal places
            rowElement.innerHTML=`
            <td>${expense.name}</td>
            <td>$${expense.amount.toFixed(3)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button class="edit-button" data-id="${expense.id}">Edit</button>
                <button class="delete-button" data-id="${expense.id}">Delete</button>
            </td>`;
            expenseList.appendChild(rowElement);
        })
    }
    //function to delete on clicking the delete button inside the expense list using event delegation
    expenseList.addEventListener("click",(e)=>{
        //delete functionality
        if(e.target.classList.contains('delete-button')){
            const id=parseInt(e.target.dataset.id); //id is the id of the target(button getting clicked) expense.id is the id of the expense
            expenses=expenses.filter(expense=>expense.id!==id);
            expensesDisplay(expenses); //display the expenses
            updateTotalAmount();
        }

        //edit functionality by using event delegation
        if(e.target.classList.contains('edit-button')){
            const id=parseInt(e.target.dataset.id);
            const expense=expenses.find(expense=>expense.id===id); //returns the first match
            document.getElementById('expense-name').value=expense.name;
            document.getElementById('expense-amount').value=expense.amount;
            document.getElementById('expense-category').value=expense.category;
            document.getElementById('expense-date').value=expense.date;
            expenses=expenses.filter(expense=>expense.id!==id); // returns a new array with values passing the test
            expensesDisplay(expenses);
            updateTotalAmount(expenses);
        }
    })

    //function to update total amount
    function updateTotalAmount(expenseList=expenses){
        let total=0;
        for(let i=0;i<expenseList.length;i++){
            total=total+expenseList[i].amount;
        }
        totalAmount.textContent=`${total.toFixed(3)}`;
    }

    //function to display expenses based on filtered category
    filterCategory.addEventListener("change",(e)=>{
        const category=e.target.value;
        if(category==="All"){
            expensesDisplay(expenses);
            updateTotalAmount(expenses);
        }else{
            const filteredExpenses=expenses.filter(expense=>expense.category===category);
            expensesDisplay(filteredExpenses);
            updateTotalAmount(filteredExpenses);
        }
    })

})