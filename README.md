# UniChar

A library that ensures safe handling of metacharacters and Unicode input.

## Table of Contents

- About
- Installation
- Features
- Usage
- Example
- License


## About
UniChar is a robust Python library designed to mitigate common vulnerabilities related to inputs like SQL injection and shell injection. The library ensures safe handling of metacharacters and Unicode thereby protecting applications from malicious inputs.

## Installation

### 1. Prerequisites
- Python 3.7.x or later

### 2. Clone the repository
`git clone https://github.com/ishre/UniChar`

This will create a local copy of the repository.
### 3. Running the script
Run the script which returns the sanitized input of preexisting values in the script which can be modified according to the user requirements.

## Features
UniChar has a plethora of input sanitization features which ensures the safe handling of variety input types.

#### HTML Escape
Inputs containing HTML tags are and JavaScript code are sanitized to prevent XSS attacks due to which the input string is treated as plaintext and not executed as script code in browser.
#### SQL Escape
SQL injection attacks are prevented by sanitizing inputs containing SQL code, making sure that the input string is treated as a literal value and not interpreted as a part of an SQL statement.
#### Shell Escape
Inputs containing special characters such as spaces and hyphens are escaped to prevent shell injection. The inputs are sanitized by adding backslashes before each special character ensuring that the input string is treated as a literal command and not as shell commands or arguments.

## Usage
The function can be used directly by changing the inputs in the `test_security.py` script or accessing the public API through https://unichar.abcd/sanitize

## Examples
#### 1. SQL Injection
```
Input: '; DROP TABLE users; --
Sanitized Output: \'\'; DROP TABLE users; --
```
#### 2. Shell Injection
```
Input: rm -rf ~
Sanitized Output: rm\ -rf\ \~
```
#### 3. XSS attacks
```
Input: <script>alert('XSS attack')</script>
Sanitized Output: &lt;script&gt;alert('XSS attack')&lt;/script&gt;
```
## License
[MIT License](http://opensource.org/licenses/mit-license.php)