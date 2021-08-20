"use strict";

$(document).ready(function () {
  var store = JSON.parse(localStorage.getItem("store"));
  var value;
  $(".form").submit(function (e) {
    e.preventDefault();
  });

  if (store !== null) {
    store.forEach(function (element) {
      $(".todolist").append("<li><input disabled=\"true\" id=\"input\" value=".concat(element, "><div><i class=\"fas fa-trash-alt\"></i><i class=\"fas fa-edit\"></i></div></li>"));
    });
  } else {
    store = [];
  }

  $(".add-btn").click(function () {
    value = $(".todo-text").val();

    if (value !== "") {
      $(".todolist").append("<li><input id=\"input\" disabled=\"true\" value=".concat(value, "><div><i class=\"fas fa-trash-alt\"></i><i class=\"fas fa-edit\"></i></div></li>"));
      store.push(value);
      localStorage.setItem("store", JSON.stringify(store));
    }

    $(".todo-text").val("");
  });
  $(".todolist").on("click", ".fa-trash-alt", function () {
    $(this).parent().parent().each(function () {
      var _this = this;

      store = store.filter(function (el) {
        return el !== $(_this).find("input").val();
      });
      localStorage.setItem("store", JSON.stringify(store));
      $(this).remove();
    });
  });
  $(".todolist").on("click", ".fa-edit", function () {
    var _this2 = this;

    $(this).parent().parent().find("#input").prop("disabled", false);
    $(this).parent().parent().find("#input").focusout(function () {
      $(this).prop("disabled", true);
    });

    if (!$(this).hasClass("save")) {
      store = store.filter(function (el) {
        return el !== $(_this2).parent().parent().find("#input").val();
      });
      $(this).parent().parent().find("#input").focus().change(function () {
        value = $(this).parent().parent().find("#input").val();
        store.push(value);
        localStorage.setItem("store", JSON.stringify(store));
      });
    }

    $(this).addClass("save");
  });
  $(".todolist").on("click", ".save", function () {
    $(this).parent().parent().find("#input").prop("disabled", true);
    $(this).removeClass(" save");
  });
});