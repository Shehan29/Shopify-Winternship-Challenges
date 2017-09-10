import urllib, json

pageNumber = 0                          #iterator for querying the pages
validationRules = {}                    #dictionary that will hold the specified rules
response = {'invalid_customers': []}    #initial json response response containing empty array of invalid_customers

def typeName(acceptedType):             #function returns the correct type to compare the data with
    Type = None
    if acceptedType:
        if acceptedType == 'number':
            Type = int
        elif acceptedType == 'boolean':
            Type = bool
        elif acceptedType == 'string':
            Type = unicode
    return Type

def inRange(min, max, value):           #function checks if length of value is in range if specified
    return (not min or len(value) >= min) and (not max or len(value) >= max)

def correctType(value, acceptedType):   #function checks if value is of the correct type if a type is specified
    return (not acceptedType or type(value) is acceptedType)

while (True):
    url = "https://backend-challenge-winter-2017.herokuapp.com/customers.json?page=" + str(pageNumber)
    pageNumber += 1
    urlResponse = urllib.urlopen(url)
    jsonData = json.loads(urlResponse.read())

    if pageNumber == 1:                 #enters once for page 0, so that the validation rules can be obtained and validation can begin starting page 1
        for validation in jsonData.get('validations'):
            ruleName = next(iter(validation))
            rule = validation[ruleName]
            ruleList = {}
            ruleList['required'] = rule.get('required')
            ruleList['type'] = rule.get('type')
            ruleList['length'] = rule.get('length')
            validationRules[ruleName] = ruleList

    else:                               #validation
        customerList = jsonData.get('customers')
        if (not isinstance(customerList, list) or len(customerList) == 0):  #output response and exit loop when no more customers exist
            print response
            break

        for customer in customerList:
            errors = []
            for prop, propValue in dict.items(validationRules):
                value = customer.get(prop)              #input value from customer
                exist = value or value == False         #true if value exists
                required = propValue.get('required')    #true if value is required
                acceptedType = typeName(propValue.get('type'))    #type of data that should be inputted by customer
                length = propValue.get('length')                  #required range for string input

                Min = None
                Max = None
                if length:                              #extract min and max values if they exist
                    Min = length.get('min')
                    Max = length.get('max')

                if (not exist and required):
                    errors.append(str(prop))
                elif exist and not(correctType(value, acceptedType) and inRange(Min, Max, value)):
                    errors.append(str(prop))

            if (len(errors)):
                customerError = {'id': customer.get('id'), 'invalid_fields': errors}
                response['invalid_customers'].append(customerError)


