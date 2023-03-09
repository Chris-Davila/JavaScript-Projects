var products = {
    white: {
        plain: {
            unit_price: 5.12,
            photo: "v-white.jpg",
        },
        printed: {
            unit_price: 8.95,
            photo: "v-white-personalized.jpg",
        },
    },

    colored: {
        plain: {
            unit_price: 6.04,
            photo: "v-color.jpg",
        },
        printed: {
            unit_price: 9.47,
            photo: "v-color-personalized.png",
        },
    },
};

// Search params
var search_params = {
    quantity: "",
    color: "",
    quality: "",
    style: "",
};

// Additional pricing rules:

// 1. The prices above are for Basic quality (q150).
// The high quality shirt (190g/m2) has a 12% increase in the unit price.

// 2. Apply the following discounts for higher quantities:
// 1: above 1.000 units - 20% discount
// 2: above 500 units - 12% discount
// 3: above 100 units - 5% discount

// Solution:
$(function () {
    function updateParams() {
        search_params.quantity = $("#quantity").val();
        search_params.color = $("#color .color-option.selected").attr("id");
        search_params.quality = $("#quality .quality-option.selected").attr(
            "id"
        );
        search_params.style = $("#style option:selected").val();
        updateOrderDetails();
    }

    function updateOrderDetails() {
        $(".refresh-loader").show();
        var grandTotal, finalTotal;
        $("#photo-product").attr(
            "src",
            "img/" + products[search_params.color][search_params.style].photo
        );
        $("#result-product").html(
            search_params.quality === "q190"
                ? "High-End t-shirt"
                : "Basic t-shirt"
        );
        $("#result-style").html(
            $("#style option[value='" + search_params.style + "']").text()
        );
        $("#result-quality").html($("#" + search_params.quality).text());
        $("#result-color").html($("#" + search_params.color).text());
        $("#result-quantity").html(search_params.quantity);

        grandTotal = "" + calculateTotal().toFixed(2);
        const cents = grandTotal.split(".")[1];
        finalTotal = parseInt(grandTotal);

        $("#total-price").text(finalTotal.toLocaleString() + "." + cents);
        window.setTimeout(function () {
            $(".refresh-loader").hide();
        }, 500);
    }

    function calculateTotal() {
        var unitPrice =
            products[search_params.color][search_params.style].unit_price;
        var total;

        // check if the quality is high(q190)
        if (search_params.quality === "q190") {
            // apply the 12% markup on price
            unitPrice *= 1.12;
        }

        total = search_params.quantity * unitPrice;

        if (search_params.quantity > 1000) {
            // apply 20% discount
            total *= 0.8;
        } else if (search_params.quantity > 500) {
            // apply 12% discount
            total *= 0.88;
        } else if (search_params.quantity > 100) {
            // apply 5% discount
            total *= 0.95;
        }

        return total;
    }

    updateParams();

    // have params on load, now need to set the events on each filter condition element
    $("#quantity").change(function () {
        search_params.quantity = $("#quantity").val();
        updateOrderDetails();
    });

    $("#style").change(function () {
        search_params.style = $("#style option:selected").val();
        updateOrderDetails();
    });

    $(".option-filter .option-button").click(function () {
        var selectionParent = $(this).parent().attr("id");

        $("#" + selectionParent + " .option-button").removeClass("selected");
        $(this).addClass("selected");

        search_params[selectionParent] = $(
            "#" + selectionParent + " .option-button.selected"
        ).attr("id");

        updateOrderDetails();
    });
});
