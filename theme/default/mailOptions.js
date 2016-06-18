module.exports = {
    subject: "Delivery Notice",
    getHtml: (employee) => {
        return '<b>You have a delivery today.</b><img src="' + employee.image + '" alt="Delivery Person" width="150" height="150" />';
    }
};
