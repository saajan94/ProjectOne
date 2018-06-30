$(document).ready(function () {
    $("#calendar").fullCalendar({
        theme: true,
        businessHours: true,
        editable: true,
        header: {
            left: 'month,agendaWeek,agendaDay',
            center: 'title',
            right: "prevYear, prev, next, nextYear"
        },
    });
});