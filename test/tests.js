/*global cmajs, cmapi, QUnit */
QUnit.test("privy.getProp", function (assert){
  assert.expect(1);
  var myOctadom = com_octabits_octadom({isTest : true});
  var nestedObj = {prop1: { subProp: { underProp: "taco"}}};
  var odResponse = myOctadom.loophole.getProp(nestedObj,"prop1.subProp.underProp");
  assert.strictEqual(odResponse,"taco", "This should dig into the supplied object and return the nested value");
});

QUnit.test("privy.getProp", function (assert){
  assert.expect(5);
   var myOctadom = com_octabits_octadom({isTest : true});
  var valType = myOctadom.loophole.checkValType({val:[1,2,3,4]});
  assert.strictEqual(valType, myOctadom.loophole.valTypes.ARRAY);

  valType = myOctadom.loophole.checkValType({val: {prop: 1, porp2: 2}});
  assert.notStrictEqual(valType, myOctadom.loophole.valTypes.ARRAY);

  valType = myOctadom.loophole.checkValType({val: "I am a string"});
  assert.strictEqual(valType, myOctadom.loophole.valTypes.STRING);

  valType = myOctadom.loophole.checkValType({val: []});
  assert.notStrictEqual(valType, myOctadom.loophole.valTypes.STRING);

  valType = myOctadom.loophole.checkValType({val : {feed: "me"}});
  assert.strictEqual(valType, myOctadom.loophole.valTypes.OBJECT);

});
/*
QUnit.asyncTest("octadom fromTemplate", function (assert) {
  assert.expect(1);
  var provider = {
    list1 : ["hello","I am a","provider"]
  }
  var provider = {

  }
  var template = function (provider) {
    var template = {
  "el": "ul",
  "atts": {
    "style": "color: #ff0000"
  },
  "val": [{
    "el": "li",
    "each" : ""
    "val": [{
      "val": "list item 1"
    }, {
      "val": "list item 2"
    }, {
      "el": "div",
      "val": {
        "el": "p",
        "val": "I like tacos"
      }
    }]
  }]
};
  return template;
};

function success (response) {
  assert.ok(typeof response === "string", "Passed!");
  QUnit.start();
}

function fail (response) {
  assert.ok(true === false, "fail method was invoked");
  QUnit.start();
}
  var result = octadom.template({provider: data, template: template, success: success, fail: fail});
  assert.ok(result === true, "Passed!");

});
*/
