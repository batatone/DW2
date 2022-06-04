const Modal = {
  open() {
    //abrir modal

    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    //fechar
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};


const Storage = {
    get() {
      return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },
    set(transactions) {
      localStorage.setItem(
        "dev.finances:transactions",
        JSON.stringify(transactions)
      );
    },
  };

const Form = {
    description: document.querySelector("input#description"),
    amount: document.querySelector("input#amount"),
    date: document.querySelector("input#date"),
  
    getValues() {
      return {
        description: this.description.value,
        amount: this.amount.value,
        date: this.date.value,
      };
    },
  
    validateFields() {
      const { description, amount, date } = this.getValues();
  
      if (
        description.trim() === "" ||
        amount.trim() === "" ||
        date.trim() === ""
      ) {
        throw new Error("Por favor, preencha todos os campos");
      }
    },
  
    formatValues() {
      let { description, amount, date } = this.getValues();
  
      amount = Utils.formatAmount(amount);
  
      date = Utils.formatDate(date);
  
      return {
        description,
        amount,
        date,
      };
    },
    clearFields() {
      this.description.value = "";
      this.amount.value = "";
      this.date.value = "";
    },
    submit(event) {
      event.preventDefault();
      try {
        this.validateFields();
        const transaction = this.formatValues();

        Transaction.add(transaction);
        this.clearFields();
        Modal.close();
      } catch (error) {
        alert(error.message);
      }
    },
  };
  
const Transaction = {
  all: Storage.get(),
  add(transaction) {
    this.all.push({
      description: transaction.description,
      amount: transaction.amount,
      date: transaction.date,
    });

    App.reload();
  },
  remove(index) {
    this.all.splice(index, 1);
    App.reload();
  },
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    this.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(objectTransaction, index) {
    const amount = Utils.formatCurrency(objectTransaction.amount);
    return `<tr>
            <td class="description">${objectTransaction.description}</td>
            <td class="${Utils.getTransactionClass(amount)}"> ${amount} </td>
            <td class="date"> ${objectTransaction.date}</td>
            <td><img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Foto para remover"></td>
        </tr>`;
  },

  updateDisplays() {
    const incomeElement = document.getElementById("incomeDisplay");
    const expenseElement = document.getElementById("expenseDisplay");
    const totalElement = document.getElementById("totalDisplay");

    let expenses = 0,
      incomes = 0,
      total = 0;

    Transaction.all.forEach((transactions) => {
      const amountIsNegative = transactions.amount < 0;
      if (amountIsNegative) {
        expenses += transactions.amount;
      } else {
        incomes += transactions.amount;
      }
      total += transactions.amount;
    });

    incomeElement.innerHTML = Utils.formatCurrency(incomes);
    expenseElement.innerHTML = Utils.formatCurrency(expenses);
    totalElement.innerHTML = Utils.formatCurrency(total);
  },

  clearTransactions() {
    this.transactionsContainer.innerHTML = "";
  },
};

const Utils = {
  formatCurrency(amount) {
    const signal = Number(amount) < 0 ? "-" : "";

    let value = String(amount).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return `${signal + value}`;
  },
  formatAmount(value) {
    value = Number(value) * 100;
    return Math.round(value)
  },
  formatDate(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },

  getTransactionClass(amount) {
    return amount[0] == "-" ? "expense" : "income";
  },
};

const App = {
  init() {
    Transaction.all.forEach((transactions, index) =>
      DOM.addTransaction(transactions, index)
    );
    DOM.updateDisplays();

    Storage.set(Transaction.all);

  },
  reload() {
    DOM.clearTransactions();
    this.init();
  },
};

App.init();
