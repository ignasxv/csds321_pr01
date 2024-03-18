$(document).ready(function(){

  var fields = ['username', 'firstname', 'lastname', 'phonenumber', 'faxnumber', 'email', 'checkin', 'checkout'];
  var isValid = true;
  var totalCost;

  // checking changes in checking date
  $("#checkin").change(totalCostAndDays);

  //checking changes in checkout date
  $("#checkout").change(totalCostAndDays);

  //checking changes in number of adults
  $("#adults").change(totalCostAndDays);


  //calculating and displaying total days and costs
  function totalCostAndDays(){
    var inDate = moment($("#checkin").val()),
        outDate = moment($("#checkout").val()),
        totalDays = outDate.diff(inDate, "Days"); 
    
    var totalAdults = parseInt($(adults).val());
        totalCost = totalAdults * 150 * totalDays;

    $("#totaldays[readonly]").val(totalDays || 0);

    $("#totalcost[readonly]").val(totalCost || 0);

  }

  $("#reset").click( function(){
    $('.red-error').removeClass('has-error');
    toastr["info"]("the fields were successfully cleared!", "", {
      closeButton: true,
      progressBar: true,
      showDuration: 100,
      timeOut: 1200,
      preventDuplicates: false,
      
    });
  });

  $("#submit").click( function(){
    
    var isValid = true;

    fields.forEach(function (field){
      var input = $('#' + field);
      if(input.val().trim()==""){
        input.closest('.red-error').addClass('has-error');
        isValid = false;
        toastIt("error", field + " is missing!", "Missing field"); 
      }
      else{
        input.closest('.red-error').removeClass('has-error');
      }
    });

    if(isNaN(totalCost) || totalCost == 0 ){
      toastIt( "error", "No cost was calculated!", "Cost Error");
      isValid = false;
    }
    if(totalCost < 0){
      toastIt("error", "The cost is negative!", "Cost Error");
      isValid = false;
    }

    if(isValid){
      toastIt("success", "The form was successfully submitted!", "Success")
    }
    
  });

  function toastIt(t, content, errorCategory){

    var t = t;
    toastr[t]( content, errorCategory, {
      closeButton: true,
      progressBar: true,
      timeOut: 1200,
      positionClass: "toast-top-right",
      preventDuplicates: true,
    });

  }

});