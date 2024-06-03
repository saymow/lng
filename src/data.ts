export const INITIAL_PROGRAM = `var a_x;
var a_y;
var b_x;
var b_y;
var slope;
var y_intercept;

fun compute_slope(a_x, a_y, b_x, b_y) {
  return (a_y - b_y) / (a_x - b_x);
}

fun compute_y_intercept(x, y, slope) {
  return y - x * slope;
}

a_x = number(input("1° point x: "));
a_y = number(input("1° point y: "));
b_x = number(input("2° point x: "));
b_y = number(input("2° point y: "));
slope = compute_slope(a_x, a_y, b_x, b_y);
y_intercept = compute_y_intercept(a_x, a_y, slope);

if (y_intercept  > 0) 
  print "y = " + string(slope) + "x + " + string(compute_y_intercept(a_x, a_y, slope)); 
else if (y_intercept < 0) 
  print "y = " + string(slope) + "x - " + string(abs(compute_y_intercept(a_x, a_y, slope)));
else
  print "y = " + string(slope) + "x";  
`;
