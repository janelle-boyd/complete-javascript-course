var BudgetController = (function () {

    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    }

    function calculateTotal(type) {
        let sum = 0;
        data.allItems[type].forEach((curr, index, arr) => {
            sum += curr.value;
        });

        data.totals[type] = sum;
    }

    return {
        addItem: function (type, desc, val) {
            var newItem, id;
            id = data.allItems[type].length > 0 ? data.allItems[type][data.allItems[type].length - 1].id + 1 : 0;

            // Create new item based on 'exp' or 'inc' type
            switch (type) {
                case 'exp':
                    newItem = new Expense(id, desc, val);
                    break;
                case 'inc':
                    newItem = new Income(id, desc, val);
                    break;
                default:
                    break;
            }

            data.allItems[type].push(newItem);
            return newItem;
        },

        calculateBudget: function() {
            calculateTotal('exp');
            calculateTotal('inc');
            data.budget = data.totals.inc - data.totals.exp;
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        },

        deleteItem: function(type, id) {
            let ids, index;
            
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexIf(id);

            if (index !== -1) {
                data.allItems[type].splice
            }
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.totalIncome,
                totalExpenses: data.totalExpenses,
                percentage: data.percentage
            }
        }
    };

})();

var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        expensesContainer: '.expenses__list',
        incomeContainer: '.income__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    }

    return {
        addListItem: function (obj, type) {
            var html, newHtml, element;

            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // 
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function () {
            let fields, fieldsArr;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach((curr, index, arr) => {
                curr.value = "";
            });

            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalIncome;
            document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExpenses;

            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
        },

        getDOMStrings: function () {
            return DOMStrings;
        },

        getInput: function () {
            return {
                // inc or exp
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
            }
        }
    };

})();

// GLOBAL APP CONTROLLER
var Controller = (function (BudgetCtrl, UICtrl) {

    let setupEventListeners = function () {
        let DOM = UICtrl.getDOMStrings();
        let addBtn = document.querySelector(DOM.inputButton);
        let deleteBtn = document.querySelector(DOM.container)

        addBtn.addEventListener('click', addItem);
        deleteBtn.addEventListener('click', deleteItem)
        
        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 13 || e.which === 13) {
                addItem();
            }
        });
    }

    function updateBudget() {
        // 1. Calculate the budget
        BudgetCtrl.calculateBudget();

        // 2. Return the budget
        let budget = BudgetCtrl.getBudget();

        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    }

    function addItem(e) {
        let input, newItem;

        // 1. Get the field input data
        input = UICtrl.getInput();

        if (input.description.trim() !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = BudgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the new item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // Calculate and update budget
            updateBudget();
        }
    }

    function deleteItem(e) {
        let itemId, splitId, type, id;
        itemId = console.log(e.target.parentNode.parentNode.parentNode.parentNode.id);
    
        if (itemId) {
            splitId = itemId.split('-');
            type = splitId[0];
            id = splitId[1];
        }
    }

    return {
        init: function () {
            UICtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totalExpenses: 0,
                percentage: 0
            });
            setupEventListeners();
        }
    }

})(BudgetController, UIController);

Controller.init();