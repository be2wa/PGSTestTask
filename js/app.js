$(function() {
    var topscorersSection = $('section.topscorers');
    
    function insertContent(scorers) {
        
        var tableElement = $(topscorersSection).find('table');
        var theadElement = $(tableElement).find('thead');
        var tbodyElement = $(tableElement).find('tbody');
        var tableHeaderRow = $('<tr>');
        var positionHeaderData = $('<th>').text('POZYCJA');
        var playerHeaderData = $('<th>').text('ZAWODNIK');
        var goalsHeaderData = $('<th>').text('GOLE');
        
        tableHeaderRow.append(positionHeaderData);
        tableHeaderRow.append(playerHeaderData);
        tableHeaderRow.append(goalsHeaderData);
        theadElement.append(tableHeaderRow);
        
        for(var i = 0; i < 10; i++) {
            var position = i + 1;
            var tableDataRow = $('<tr>');
            var dividerDiv = $('<div>', {'class': 'divider'}).text(scorers[i].fullname);
            var positionTableData = $('<td>').text(position);
            var playerTableData = $('<td>');
            var goalsTableData = $('<td>').text(scorers[i].goals);
            playerTableData.append(dividerDiv);
            tableDataRow.append(positionTableData);
            tableDataRow.append(playerTableData);
            tableDataRow.append(goalsTableData);
            tbodyElement.append(tableDataRow);
        }
    }
    
    function loadData() {
        var loadingH2 = $('<h2>Loading...</h2>');
        $('.topscorers').find('table').before(loadingH2);
        $.ajax({
            url: 'https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/serie-a/seasons/15-16/topscorers',
            method: 'GET',
            dataType: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('X-Mashape-Authorization', 'kxSXmUymofmshFHhhKxWOSJpqJsJp1I3zNnjsnqKwhITAiC1zw');
            }
        }).done(function(response) {
            loadingH2.remove();
            insertContent(response.data.topscorers);
        }).fail(function(error) {
            console.log(error);
        })
    }

  loadData();

});