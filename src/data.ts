export const INITIAL_PROGRAM = `var a_x;
var a_y;
var b_x;
var b_y;
var slope;
var y_intercept;

fun compute_slope(x0, y0, x, y) {
    return (y - y0) / (x - x0);
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

if (y_intercept  > 0) {
    output("y = " + string(slope) + "x + " + string(y_intercept));
} else if (y_intercept < 0) {
    output("y = " + string(slope) + "x - " + string(abs(y_intercept)));
} else {
    output("y = " + string(slope) + "x");
}
`;