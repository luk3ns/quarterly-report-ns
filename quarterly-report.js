function suitelet(request, response){	
	var Q=quarter_of_the_year(new Date());
	var d = new Date();
	var Y = d.getFullYear();
	if(Q==1) Y=Y-1;
	var lastY=Y-1;
	if(Q>1)
		var lastQ=Q-1; 
  	else
		var lastQ=4; 
	
	
	
    var vendorid = request.getParameter('custpage_vendorid');
    var vendor="";
    if(!vendorid || vendorid=="") vendor="TOTAL - ";
    if(vendorid==1) vendor="Vendor#1 - ";
    if(vendorid==2) vendor="Vendor#2 - ";
    if(vendorid==3) vendor="Vendor#3 - ";
    if(vendorid==4) vendor="Vendor#4 - ";
    if(vendorid==5) vendor="Vendor#5 - ";
    if(vendorid==6) vendor="Vendor#6 - ";
    if(vendorid==7) vendor="Vendor#7 - ";
    if(vendorid==8) vendor="Vendor#8 - ";
	
	var form = nlapiCreateForm(vendor+'Customer Quarterly Report <br><small>Summary '+lastQ+' Quarter '+Y+'</small>');
	var date = request.getParameter('date');
	
	var userid = request.getParameter('custpage_userid');
    if(userid==null || userid=="" || userid=="null") userid="";
    var currency = request.getParameter('custpage_currency');
    if(currency==null || currency=="" || currency=="null") currency="";
	
	var dataQ1=getTransactions(userid,'q1',Y,vendorid);
    var dataQ2=getTransactions(userid,'q2',Y,vendorid);
    var dataQ3=getTransactions(userid,'q3',Y,vendorid);
    var dataQ4=getTransactions(userid,'q4',Y,vendorid);
    var dataItem=dataQ1[1];
    var csv=dataQ1[4];
	
  	if(dataQ1[0]>0)
	currency = dataQ1[1][0].currency;
  	if(dataQ2[0]>0)
	currency = dataQ2[1][0].currency;  
	
    var chartCurrentData='['+dataQ1[0].toFixed(0)+']';
    var chartPrevData='['+dataQ1[2].toFixed(2)+']';
  	var chartCat='["Q1"]';
    var chartCurrentData2='['+parseFloat(dataQ1[0].toFixed(2))+']';
    var chartPrevData2='['+parseFloat(dataQ1[2].toFixed(2))+']';
    var chartCat2='["Q1"]';
    var lastCurrentQtotal=parseFloat(dataQ1[0].toFixed(2));
    var lastPrevQtotal=parseFloat(dataQ1[2].toFixed(2));
    var totalCurrentQtotal=parseFloat(dataQ1[0].toFixed(2));
    var totalPrevQtotal=parseFloat(dataQ1[2].toFixed(2));
	
    var totalCurrent=parseFloat(dataQ1[0])+parseFloat(dataQ2[0])+parseFloat(dataQ3[0])+parseFloat(dataQ4[0]);
    totalCurrent=parseFloat(totalCurrent.toFixed(2));
    var totalPrev=parseFloat(dataQ1[2])+parseFloat(dataQ2[2])+parseFloat(dataQ3[2])+parseFloat(dataQ4[2]);
    totalPrev=parseFloat(totalPrev.toFixed(2));
	
 	if(Q==1){
		dataItem=dataQ4[1];
		csv=dataQ1[4]+dataQ2[4]+dataQ3[4]+dataQ4[4];
		lastCurrentQtotal=parseFloat(dataQ4[0].toFixed(2));
		lastPrevQtotal=parseFloat(dataQ4[2].toFixed(2));
		totalCurrentQtotal=parseFloat(dataQ1[0])+parseFloat(dataQ2[0])+parseFloat(dataQ3[0])+parseFloat(dataQ4[0]);
		totalPrevQtotal=parseFloat(dataQ1[2])+parseFloat(dataQ2[2])+parseFloat(dataQ3[2])+parseFloat(dataQ4[2]);
		chartCurrentData='['+dataQ1[0].toFixed(2)+','+dataQ2[0].toFixed(2)+','+dataQ3[0].toFixed(2)+','+dataQ4[0].toFixed(2)+']';
		chartPrevData='['+dataQ1[2].toFixed(2)+','+dataQ2[2].toFixed(2)+','+dataQ3[2].toFixed(2)+','+dataQ4[2].toFixed(2)+']';
		chartCat='["Q1","Q2","Q3","Q4"]';
		chartCurrentData2='['+(parseFloat(dataQ1[0])+parseFloat(dataQ2[0])+parseFloat(dataQ3[0])+parseFloat(dataQ4[0]))+']';
		chartPrevData2='['+(parseFloat(dataQ1[2])+parseFloat(dataQ2[2])+parseFloat(dataQ3[2])+parseFloat(dataQ4[2]))+']';      
		chartCat2='["Q1 - Q4"]';
	}
  	if(Q>1){
		dataItem=dataQ2[1];
		csv=dataQ1[4];
		lastCurrentQtotal=parseFloat(dataQ1[0].toFixed(2));
		lastPrevQtotal=parseFloat(dataQ1[2].toFixed(2));
		totalCurrentQtotal=parseFloat(dataQ1[0]);
		totalPrevQtotal=parseFloat(dataQ1[2]);
		chartCurrentData='['+dataQ1[0].toFixed(2)+']';
		chartPrevData='['+dataQ1[2].toFixed(2)+']';
		chartCat='["Q1""]';
		chartCurrentData2='['+parseFloat(dataQ1[0].toFixed(2))+']';
		chartPrevData2='['+parseFloat(dataQ1[2].toFixed(2))+']';   
		chartCat2='["Q1"]';
	}
  	if(Q>2){
		dataItem=dataQ2[1];
		csv=dataQ1[4]+dataQ2[4];
		lastCurrentQtotal=parseFloat(dataQ2[0].toFixed(2));
		lastPrevQtotal=parseFloat(dataQ2[2].toFixed(2));
		totalCurrentQtotal=parseFloat(dataQ1[0])+parseFloat(dataQ2[0]);
		totalPrevQtotal=parseFloat(dataQ1[2])+parseFloat(dataQ2[2]);
		chartCurrentData='['+dataQ1[0].toFixed(2)+','+dataQ2[0].toFixed(2)+']';
		chartPrevData='['+dataQ1[2].toFixed(2)+','+dataQ2[2].toFixed(2)+']';
		chartCat='["Q1","Q2"]';
		chartCurrentData2='['+(parseFloat(dataQ1[0].toFixed(2))+parseFloat(dataQ2[0].toFixed(2)))+']';
		chartPrevData2='['+(parseFloat(dataQ1[2].toFixed(2))+parseFloat(dataQ2[2].toFixed(2)))+']';   
		chartCat2='["Q1 - Q2"]';
		}
	if(Q>3){
		dataItem=dataQ3[1];
		csv=dataQ1[4]+dataQ2[4]+dataQ3[4];
		lastCurrentQtotal=parseFloat(dataQ3[0].toFixed(2));
		lastPrevQtotal=parseFloat(dataQ3[2].toFixed(2));
		totalCurrentQtotal=parseFloat(dataQ1[0])+parseFloat(dataQ2[0])+parseFloat(dataQ3[0]);
		totalPrevQtotal=parseFloat(dataQ1[2])+parseFloat(dataQ2[2])+parseFloat(dataQ3[2]);
		chartCurrentData='['+dataQ1[0].toFixed(2)+','+dataQ2[0].toFixed(2)+','+dataQ3[0].toFixed(2)+']';
		chartPrevData='['+dataQ1[2].toFixed(2)+','+dataQ2[2].toFixed(2)+','+dataQ3[2].toFixed(2)+']';
		chartCat='["Q1","Q2","Q3"]';
		chartCurrentData2='['+(parseFloat(dataQ1[0].toFixed(2))+parseFloat(dataQ2[0].toFixed(2))+parseFloat(dataQ3[0].toFixed(2)))+']';
		chartPrevData2='['+(parseFloat(dataQ1[2].toFixed(2))+parseFloat(dataQ2[2].toFixed(2))+parseFloat(dataQ3[2].toFixed(2)))+']';   
		chartCat2='["Q1 - Q3"]';
		}
	if(Q>4){
		dataItem=dataQ4[1];
		csv=dataQ1[4]+dataQ2[4]+dataQ3[4]+dataQ4[4];
		lastCurrentQtotal=parseFloat(dataQ4[0].toFixed(2));
		lastPrevQtotal=parseFloat(dataQ4[2].toFixed(2));
		totalCurrentQtotal=parseFloat(dataQ1[0])+parseFloat(dataQ2[0])+parseFloat(dataQ3[0])+parseFloat(dataQ4[0]);
		totalPrevQtotal=parseFloat(dataQ1[2])+parseFloat(dataQ2[2])+parseFloat(dataQ3[2])+parseFloat(dataQ4[2]);
		chartCurrentData='['+dataQ1[0].toFixed(2)+','+dataQ2[0].toFixed(2)+','+dataQ3[0].toFixed(2)+','+dataQ4[0].toFixed(2)+']';
		chartPrevData='['+dataQ1[2].toFixed(2)+','+dataQ2[2].toFixed(2)+','+dataQ3[2].toFixed(2)+','+dataQ4[2].toFixed(2)+']';
		chartCat='["Q1","Q2","Q3","Q4"]';
		chartCurrentData2='['+(parseFloat(dataQ1[0])+parseFloat(dataQ2[0])+parseFloat(dataQ3[0])+parseFloat(dataQ4[0]))+']';
		chartPrevData2='['+(parseFloat(dataQ1[2])+parseFloat(dataQ2[2])+parseFloat(dataQ3[2])+parseFloat(dataQ4[2]))+']';      
		chartCat2='["Q1 - Q4"]';
	}
	
  	for(j=1;j<=lastQ;j++){
		var sublist = form.addSubList('custpage_sublist'+j,'staticlist','Items bought ('+j+'Q)', 'tab1');
        sublist.addField('name', 'text', 'Item');
        sublist.addField('quantity', 'text', 'Qty. sold');
		sublist.addField('lastpurchase', 'text', 'last Purchase Date');
      	if(j==1)
			sublist.setLineItemValues(dataQ1[1]);
      	if(j==2)
			sublist.setLineItemValues(dataQ2[1]);
      	if(j==3)
			sublist.setLineItemValues(dataQ3[1]);
      	if(j==4)
			sublist.setLineItemValues(dataQ4[1]);
	}
	field2 = form.addField('custpage_html2', 'inlinehtml', "", null);
	field2.setDefaultValue('<style>text.highcharts-title {font-size: 12px!important;}#main_form {page-break-after: always;}#details-container table { width: 100%;}#details-container table tr th,#details-container table tr td { border-bottom: 1px solid silver; padding: 10px}.col-md-6 {width: 50%;  float: left;} .col-md-12 {width: 100%;} .col-md-3 {width: 25%;  float: left;  min-height: 600px;} .col-md-9 {width: 75%;}</style><select id="custpage_vendorid" name="custpage_vendorid"><option value="">Select Vendor</option><option value="vendor-internalid">Vendor Name</option><option value="vendor-internalid">Vendor Name</option><option value="vendor-internalid">Vendor Name</option><option value="vendor-internalid">Vendor Name</option><option value="vendor-internalid">Vendor Name</option><option value="vendor-internalid">Vendor Name</option><option value="vendor-internalid">Vendor Name</option></select><input name="custpage_userid" id="custpage_userid" style="display:none;" value="'+userid+'"><input name="custpage_currency" id="custpage_currency" style="display:none;" value="'+currency+'"><script>function exportCSV(){ var csv="<style>td{border:1px solid silver;}</style><table><tr><th></th><th>2017</th><th>2018</th><th>%</th></tr><tr><th>Last fiscal quarter ('+lastQ+'Q)</th><td>'+format(lastPrevQtotal,currency)+'</td><td>'+format(lastCurrentQtotal,currency)+'</td><td>'+procent(lastPrevQtotal,lastCurrentQtotal)+'</td></tr><tr><th>All fiscal quarter (1Q-'+lastQ+'Q)</th><td>'+format(totalPrevQtotal,currency)+'</td><td>'+format(totalCurrentQtotal,currency)+'</td><td>'+procent(totalPrevQtotal,totalCurrentQtotal)+'</td></tr><tr><th>Year to year</th><td>'+format(totalPrev,currency)+'</td><td>'+format(totalCurrent,currency)+'</td><td>'+procent(totalPrev,totalCurrent)+'</td></tr><tr><td colspan=3></td></tr>'+csv+'</table>"; var hiddenElement = document.createElement("a"); hiddenElement.href = "data:application/vnd.ms-excel," + encodeURI(csv);   hiddenElement.target = "_blank";  hiddenElement.download = "quarterly-report-'+lastQ+'.xls"; document.body.appendChild(hiddenElement); hiddenElement.click();}</script>');
	
	
	field1 = form.addField('custpage_html1', 'inlinehtml', "", null);
	field1.setDefaultValue('<script type="text/javascript" src="https://code.highcharts.com/highcharts.js"></script><div class="col-md-6"><div id="chart-container"></div><div id="details-container"><table><tr><th></th><th>'+lastY+'</th><th>'+Y+'</th><th>%</th></tr><tr><th>Last fiscal quarter ('+lastQ+'Q)</th><td>'+format(lastPrevQtotal,currency)+'</td><td>'+format(lastCurrentQtotal,currency)+'</td><td>'+procent(lastPrevQtotal,lastCurrentQtotal)+'</td></tr><tr><th>All fiscal quarter (1Q-'+lastQ+'Q)</th><td>'+format(totalPrevQtotal,currency)+'</td><td>'+format(totalCurrentQtotal,currency)+'</td><td>'+procent(totalPrevQtotal,totalCurrentQtotal)+'</td></tr><tr><th>Year to year</th><td>'+format(totalPrev,currency)+'</td><td>'+format(totalCurrent,currency)+'</td><td>'+procent(totalPrev,totalCurrent)+'</td></tr></table></div></div><div class="col-md-3" id="chart-container2"></div><div class="col-md-3" id="chart-container3"></div>');
	
	field3 = form.addField('custpage_html3', 'inlinehtml', "", null);
	field3.setDefaultValue('<script>Highcharts.chart("chart-container", { chart: {type: "column"}, title: {text: "Quarterly Sales Report"}, xAxis: { categories: '+chartCat+',}, yAxis: {min: 0,title: {text: "Amount ('+currency+')"} }, series: [{ name: "'+lastY+'", data: '+chartPrevData+' }, { name: "'+Y+'",color: "#26d073",data: '+chartCurrentData+' }]});</script>');  
	
	field4 = form.addField('custpage_html4', 'inlinehtml', "", null);
	field4.setDefaultValue('<script>Highcharts.chart("chart-container2", { chart: {type: "column"}, title: {text: "Total Sales (Same Quarter Last Year)"}, xAxis: { categories: '+chartCat2+',}, yAxis: {min: 0,title: {text: "Amount ('+currency+')"} }, series: [{ name: "'+lastY+'", data: '+chartPrevData2+' }, { name: "'+Y+'",color: "#26d073",data: '+chartCurrentData2+' }]});</script>');    
	
	field5 = form.addField('custpage_html5', 'inlinehtml', "", null);
	field5.setDefaultValue('<script>Highcharts.chart("chart-container3", { chart: {type: "column"}, title: {text: "Year to Year"}, xAxis: { categories: ["All Transactions Amount"],}, yAxis: {min: 0,title: {text: "Amount ('+currency+')"} }, series: [{ name: "'+lastY+'", data: ['+totalPrev+'] }, { name: "'+Y+'",color: "#26d073",data: ['+totalCurrent+'] }]});</script>');  
	
    form.addSubmitButton('Submit');
    form.addButton('custpage_button_csv','Export to Excel', 'exportCSV()');  
	response.writePage(form);
}

////////////////////////////////////////////

function getTransactions(userid,date,year,vendorid){
	var y = year;
	
	
	if(date=="q1"){
		var startdate='1/1/';
		var endtdate='31/3/';
	}
	if(date=="q2"){
		var startdate='1/4/';
		var endtdate='30/6/';
	}  
	if(date=="q3"){
		var startdate='1/7/';
		var endtdate='30/9/';
	}  
	if(date=="q4"){
		var startdate='1/10/';
		var endtdate='31/12/';
	}  
	var columns = new Array();
	columns[0] = new nlobjSearchColumn('item', null, 'group');
	columns[1] = new nlobjSearchColumn('quantity', null, 'sum').setSort(1);
	columns[2] = new nlobjSearchColumn('fxamount', null, 'sum');
    columns[3] = new nlobjSearchColumn('amount', null, 'sum');
    columns[4] = new nlobjSearchColumn('currency', null, 'group');
    columns[5] = new nlobjSearchColumn('trandate', null, 'max');
	
	
	var filters = new Array();
    if(userid)
		filters[0] = new nlobjSearchFilter('customersubof', null, 'is', userid);
	else  
		filters[0] = new nlobjSearchFilter('type', null, 'is', 'CustInvc');
	
	filters[1] = new nlobjSearchFilter('trandate', null, 'onorafter', startdate+y);
	filters[2] = new nlobjSearchFilter('trandate', null, 'onorbefore', endtdate+y);
	filters[3] = new nlobjSearchFilter('type', null, 'is', 'CustInvc');
	filters[4] = new nlobjSearchFilter('taxitem', null, 'is', 'NO');
	filters[5] = new nlobjSearchFilter('type', 'item', 'anyof', ['InvtPart','Kit']);
	if(vendorid) filters[6] = new nlobjSearchFilter('othervendor', 'item', 'is', vendorid);
	var results1 = nlapiSearchRecord('transaction', null, filters, columns);
	
	filters[1] = new nlobjSearchFilter('trandate', null, 'onorafter', startdate+(y-1));
	filters[2] = new nlobjSearchFilter('trandate', null, 'onorbefore', endtdate+(y-1));
	var results2 = nlapiSearchRecord('transaction', null, filters, columns);
	
    var data= new Array();
	var data1= new Array();
	var data2= new Array();
    var total1=0;
    var total2=0;
    var csv1="<tr><th colspan='3'>Items bought ("+date+")</th></tr><tr><th>Name</th><th>Qty</th><th>Last Purchase</th></tr>";
    var csv2="<tr><th colspan='3'>Items bought ("+date+")</th></tr><tr><th>Name</th><th>Qty</th><th>Last Purchase</th></tr>";
	for(var i in results1){
      	var currency=results1[i].getText('currency', null, 'group'); 
		var name=results1[i].getText('item', null, 'group'); 
		var quantity=results1[i].getValue('quantity', null, 'sum');
        var lastPurchase=results1[i].getValue('trandate', null, 'max');
		var amount=results1[i].getValue('fxamount', null, 'sum'); 
		total1+=parseFloat(amount);
		data1[i]={'name':name, 'quantity':quantity, 'amount':amount,'lastpurchase':lastPurchase, 'currency':currency};
        csv1+="<tr><td>"+name+"</td><td>"+quantity+"</td><td>"+lastPurchase+"</td></tr>";
	}
	for(var i in results2){
		
        var currency=results2[i].getText('currency', null, 'group'); 
		var name=results2[i].getText('item', null, 'group'); 
		var lquantity=results2[i].getValue('quantity', null, 'sum'); 
        var llastPurchase=results2[i].getValue('trandate', null, 'max');
		var lamount=results2[i].getValue('fxamount', null, 'sum'); 
		
		total2+=parseFloat(lamount);
		data2[i]={'name':name, 'quantity':lquantity, 'amount':lamount, 'lastpurchase':llastPurchase, 'currency':currency};
        csv2+="<tr><td>"+name+"</td><td>"+lquantity+"</td><td>"+llastPurchase+"</td></tr>";
	}  
	
  	data[0]=total1;
  	data[1]=data1;
  	data[2]=total2;
  	data[3]=data2;
  	data[4]=csv1;
  	data[5]=csv2;
	return data;
}

function quarter_of_the_year(date){
    var month = date.getMonth() + 1;
    return (Math.ceil(month / 3));
}
function procent(prev,current){
	var p=(parseFloat(current)*100)/parseFloat(prev);
	p=p-100;
	if(p>0)
		p="<span style='color: green;'>+"+p.toFixed(2)+"%</span>";
	else
    	p="<span style='color: red;'>"+p.toFixed(2)+"%</span>";
	return p;
}
function format(n, currency) {
    return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")+ " " +currency ;
}
