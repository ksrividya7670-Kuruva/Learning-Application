// Comprehensive Data Registry for Playground: Languages, Templates, Practice Problems, AI Prompts, Cheat Sheets & Complexity Guides

export const SUPPORTED_LANGUAGES = [
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '💛',
    extension: 'js',
    version: 'Node.js v20.x',
    defaultCode: `// 🚀 Welcome to VeeruProAc JavaScript Playground
// Function to find the maximum sum of contiguous subarray (Kadane's Algorithm)

function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let currentMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }

  return maxSoFar;
}

// Test Kadane's Algorithm
const numbers = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const result = maxSubArray(numbers);

console.log("=== JavaScript Output ===");
console.log("Input Array:", JSON.stringify(numbers));
console.log("Maximum Subarray Sum:", result);
`
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    extension: 'py',
    version: 'Python 3.12',
    defaultCode: `# 🐍 Welcome to VeeruProAc Python Playground
# Efficient Two-Sum Algorithm using Hash Map

def two_sum(nums, target):
    seen = {}
    for index, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], index]
        seen[num] = index
    return []

# Test Case
numbers = [2, 7, 11, 15]
target_val = 9
indices = two_sum(numbers, target_val)

print("=== Python 3 Output ===")
print(f"Target: {target_val}")
print(f"Indices of numbers that sum to target: {indices}")
print(f"Values: {numbers[indices[0]]} + {numbers[indices[1]]} = {target_val}")
`
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: '⚡',
    extension: 'cpp',
    version: 'GCC C++20',
    defaultCode: `// ⚡ Welcome to VeeruProAc C++ Playground
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Check if string is palindrome
bool isPalindrome(const string& str) {
    int left = 0;
    int right = str.length() - 1;
    while (left < right) {
        if (str[left] != str[right]) return false;
        left++;
        right--;
    }
    return true;
}

int main() {
    string sample = "racecar";
    cout << "=== C++20 Output ===" << endl;
    cout << "Checking string: '" << sample << "'" << endl;
    if (isPalindrome(sample)) {
        cout << "Result: Correct! String is a Palindrome." << endl;
    } else {
        cout << "Result: Not a Palindrome." << endl;
    }
    return 0;
}
`
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    extension: 'java',
    version: 'OpenJDK 21',
    defaultCode: `// ☕ Welcome to VeeruProAc Java Playground
import java.util.Arrays;

public className Main {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("=== Java 21 Output ===");
        System.out.println("Original Array: " + Arrays.toString(arr));
        
        Arrays.sort(arr);
        System.out.println("Sorted Array (Binary Search Ready): " + Arrays.toString(arr));
        
        int key = 22;
        int index = Arrays.binarySearch(arr, key);
        System.out.println("Element " + key + " found at index: " + index);
    }
}
`
  },
  {
    id: 'c',
    name: 'C',
    icon: '🔵',
    extension: 'c',
    version: 'GCC C17',
    defaultCode: `/* 🔵 Welcome to VeeruProAc C Playground */
#include <stdio.h>

void printFibonacci(int n) {
    int t1 = 0, t2 = 1, nextTerm;
    printf("Fibonacci Series (First %d terms):\n", n);
    for (int i = 1; i <= n; ++i) {
        printf("%d ", t1);
        nextTerm = t1 + t2;
        t1 = t2;
        t2 = nextTerm;
    }
    printf("\n");
}

int main() {
    printf("=== C17 Output ===\n");
    printFibonacci(10);
    return 0;
}
`
  },
  {
    id: 'html',
    name: 'HTML & CSS',
    icon: '🌐',
    extension: 'html',
    version: 'HTML5 / CSS3',
    defaultCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>VeeruProAc Live Card</title>
  <style>
    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
      color: #f8fafc;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .card {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      padding: 32px;
      max-width: 400px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      text-align: center;
    }
    .badge {
      background: linear-gradient(90deg, #fb6c00, #7c3aed);
      color: white;
      font-weight: bold;
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    h2 { margin-top: 20px; font-size: 24px; }
    p { color: #94a3b8; font-size: 14px; line-height: 1.6; }
    button {
      margin-top: 16px;
      background: #7c3aed;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 10px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
    }
    button:hover { background: #6d28d9; transform: translateY(-2px); }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">Live Web Playground</span>
    <h2>VeeruProAc Frontend</h2>
    <p>Edit HTML and CSS in real-time to watch instant live browser rendering.</p>
    <button onclick="alert('Hello from VeeruProAc Playground!')">Test Interactive Click</button>
  </div>
</body>
</html>
`
  },
  {
    id: 'css',
    name: 'CSS',
    icon: '🎨',
    extension: 'css',
    version: 'CSS3 / Modern Glassmorphism',
    defaultCode: `/* Modern Glassmorphism Card Style */
.glass-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 40px 0 rgba(124, 58, 237, 0.35);
}
`
  },
  {
    id: 'sql',
    name: 'SQL',
    icon: '🗄️',
    extension: 'sql',
    version: 'PostgreSQL / SQLite',
    defaultCode: `-- 🗄️ Welcome to VeeruProAc SQL Playground
-- Querying Student Performance and Course Enrollments

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50),
    course VARCHAR(50),
    score INT,
    status VARCHAR(20)
);

INSERT INTO students VALUES 
(101, 'Rahul Sharma', 'JavaScript Masterclass', 94, 'Passed'),
(102, 'Priya Patel', 'Python Data Science', 88, 'Passed'),
(103, 'Amit Verma', 'Full-Stack Web', 91, 'Passed'),
(104, 'Ananya Roy', 'C++ Data Structures', 96, 'Passed');

-- Execute Select Query
SELECT 
    student_id, 
    name, 
    course, 
    score, 
    status 
FROM students 
WHERE score >= 90 
ORDER BY score DESC;
`
  }
];

export const PRACTICE_PROBLEMS = [
  {
    id: 'p1',
    title: '1. Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    solved: true,
    favorite: true,
    language: 'python',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.`,
    constraints: `2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9
Only one valid answer exists.`,
    sampleInput: `nums = [2,7,11,15], target = 9`,
    sampleOutput: `[0, 1]`,
    testCases: [
      { id: 1, input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]', status: 'Passed' },
      { id: 2, input: 'nums = [3,2,4], target = 6', expected: '[1, 2]', status: 'Passed' },
      { id: 3, input: 'nums = [3,3], target = 6', expected: '[0, 1]', status: 'Passed' }
    ],
    hints: [
      'Try using a Hash Map to store numbers you have seen so far.',
      'For each number x, check if (target - x) exists in the Hash Map.'
    ],
    editorial: `The optimal approach uses a Hash Map to achieve O(N) time complexity. We iterate through the array once while storing each element's index. For the current element, we check if target - current exists in our map.`,
    solutionCode: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []`
  },
  {
    id: 'p2',
    title: '2. Reverse a String',
    difficulty: 'Easy',
    category: 'Strings & Two Pointers',
    solved: true,
    favorite: false,
    language: 'javascript',
    description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    constraints: `1 <= s.length <= 10^5
s[i] is a printable ascii character.`,
    sampleInput: `s = ["h","e","l","l","o"]`,
    sampleOutput: `["o","l","l","e","h"]`,
    testCases: [
      { id: 1, input: 's = ["h","e","l","l","o"]', expected: '["o","l","l","e","h"]', status: 'Passed' },
      { id: 2, input: 's = ["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]', status: 'Passed' }
    ],
    hints: [
      'Use two pointers: one at the start (left) and one at the end (right).',
      'Swap characters at left and right, then increment left and decrement right.'
    ],
    editorial: `Using two pointers from both ends of the string allows us to swap characters in place with O(1) space complexity and O(N) time complexity.`,
    solutionCode: `function reverseString(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
  return s;
}`
  },
  {
    id: 'p3',
    title: '3. Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    solved: false,
    favorite: true,
    language: 'python',
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    constraints: `0 <= s.length <= 5 * 10^4
s consists of English letters, digits, symbols and spaces.`,
    sampleInput: `s = "abcabcbb"`,
    sampleOutput: `3`,
    testCases: [
      { id: 1, input: 's = "abcabcbb"', expected: '3', status: 'Passed' },
      { id: 2, input: 's = "bbbbb"', expected: '1', status: 'Passed' },
      { id: 3, input: 's = "pwwkew"', expected: '3', status: 'Passed' }
    ],
    hints: [
      'Use the Sliding Window technique with a set or dictionary to track character occurrences.',
      'When a duplicate is found, shrink the window from the left.'
    ],
    editorial: `Maintain a sliding window [left, right] and a hash set. Expand right until a duplicate is found, then shrink left until duplicate is removed.`,
    solutionCode: `def lengthOfLongestSubstring(s: str) -> int:
    char_set = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len`
  },
  {
    id: 'p4',
    title: '4. Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    solved: true,
    favorite: false,
    language: 'javascript',
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.`,
    constraints: `1 <= s.length <= 10^4
s consists of parentheses only '()[]{}'.`,
    sampleInput: `s = "()[]{}"`,
    sampleOutput: `true`,
    testCases: [
      { id: 1, input: 's = "()"', expected: 'true', status: 'Passed' },
      { id: 2, input: 's = "()[]{}"', expected: 'true', status: 'Passed' },
      { id: 3, input: 's = "(]"', expected: 'false', status: 'Passed' }
    ],
    hints: [
      'Use a Stack data structure.',
      'Push open brackets onto the stack. When closing bracket is encountered, pop and verify matching type.'
    ],
    editorial: `A Stack is ideal for matching nested structures. Push opening brackets and pop matching opening bracket when a closing bracket is found.`,
    solutionCode: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`
  },
  {
    id: 'p5',
    title: '5. Merge Two Sorted Lists',
    difficulty: 'Easy',
    category: 'Linked List',
    solved: false,
    favorite: true,
    language: 'cpp',
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`. Merge the two lists into one **sorted** list.`,
    constraints: `The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100`,
    sampleInput: `list1 = [1,2,4], list2 = [1,3,4]`,
    sampleOutput: `[1,1,2,3,4,4]`,
    testCases: [
      { id: 1, input: 'list1 = [1,2,4], list2 = [1,3,4]', expected: '[1,1,2,3,4,4]', status: 'Passed' },
      { id: 2, input: 'list1 = [], list2 = []', expected: '[]', status: 'Passed' }
    ],
    hints: [
      'Create a dummy head node to simplify list building.',
      'Compare head elements of both lists and attach smaller element to tail.'
    ],
    editorial: `Using a dummy head node avoids special case logic for the head. Iterate through both lists comparing values.`,
    solutionCode: `ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
    ListNode dummy(0);
    ListNode* tail = &dummy;
    while (list1 && list2) {
        if (list1->val <= list2->val) {
            tail->next = list1;
            list1 = list1->next;
        } else {
            tail->next = list2;
            list2 = list2->next;
        }
        tail = tail->next;
    }
    tail->next = list1 ? list1 : list2;
    return dummy.next;
}`
  },
  {
    id: 'p6',
    title: '6. Trapping Rain Water',
    difficulty: 'Hard',
    category: 'Two Pointers & Dynamic Programming',
    solved: false,
    favorite: true,
    language: 'cpp',
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    constraints: `n == height.length
1 <= n <= 2 * 10^4
0 <= height[i] <= 10^5`,
    sampleInput: `height = [0,1,0,2,1,0,1,3,2,1,2,1]`,
    sampleOutput: `6`,
    testCases: [
      { id: 1, input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6', status: 'Passed' },
      { id: 2, input: 'height = [4,2,0,3,2,5]', expected: '9', status: 'Passed' }
    ],
    hints: [
      'For each element, trapped water = min(max_left, max_right) - height[i].',
      'Optimize to O(1) extra space using two pointers from both ends.'
    ],
    editorial: `Using Two Pointers, track left_max and right_max as you converge from both ends.`,
    solutionCode: `int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int left_max = 0, right_max = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            height[left] >= left_max ? (left_max = height[left]) : water += (left_max - height[left]);
            left++;
        } else {
            height[right] >= right_max ? (right_max = height[right]) : water += (right_max - height[right]);
            right--;
        }
    }
    return water;
}`
  }
];

export const SYNTAX_CHEATSHEETS = {
  python: [
    { title: 'List Comprehension', code: 'squares = [x**2 for x in range(10) if x % 2 == 0]' },
    { title: 'Dictionary Iteration', code: 'for key, value in my_dict.items(): print(key, value)' },
    { title: 'Lambda & Map', code: 'double = lambda x: x * 2\nnums = list(map(double, [1, 2, 3]))' },
    { title: 'File Handling', code: 'with open("file.txt", "r") as f:\n    content = f.read()' }
  ],
  javascript: [
    { title: 'Array Destructuring', code: 'const [first, second, ...rest] = [10, 20, 30, 40];' },
    { title: 'Async / Await', code: 'async function fetchData() {\n  const res = await fetch(url);\n  return await res.json();\n}' },
    { title: 'Arrow Functions', code: 'const sum = (a, b) => a + b;' },
    { title: 'Object Spread', code: 'const updated = { ...user, isPro: true };' }
  ],
  cpp: [
    { title: 'Vector Declaration', code: 'vector<int> nums = {1, 2, 3, 4, 5};' },
    { title: 'Fast I/O', code: 'ios_base::sync_with_stdio(false); cin.tie(NULL);' },
    { title: 'Sorting Vector', code: 'sort(nums.begin(), nums.end(), greater<int>());' },
    { title: 'Unordered Map', code: 'unordered_map<string, int> counts;' }
  ],
  java: [
    { title: 'ArrayList Initialization', code: 'List<String> list = new ArrayList<>(Arrays.asList("A", "B"));' },
    { title: 'HashMap Usage', code: 'Map<String, Integer> map = new HashMap<>();\nmap.put("score", 95);' },
    { title: 'Stream Filter', code: 'List<Integer> evens = list.stream().filter(n -> n % 2 == 0).collect(Collectors.toList());' }
  ],
  sql: [
    { title: 'Group By & Having', code: 'SELECT dept, COUNT(*) FROM emp GROUP BY dept HAVING COUNT(*) > 5;' },
    { title: 'Inner Join', code: 'SELECT e.name, d.name FROM emp e JOIN dept d ON e.dept_id = d.id;' },
    { title: 'Window Function', code: 'SELECT name, score, RANK() OVER(ORDER BY score DESC) FROM students;' }
  ]
};

export const TIME_COMPLEXITY_GUIDE = [
  { notation: 'O(1)', name: 'Constant Time', example: 'Hash Table Lookup / Array Index Access' },
  { notation: 'O(log N)', name: 'Logarithmic Time', example: 'Binary Search in Sorted Array' },
  { notation: 'O(N)', name: 'Linear Time', example: 'Single Pass Array Traversal' },
  { notation: 'O(N log N)', name: 'Linearithmic Time', example: 'Merge Sort / Quick Sort' },
  { notation: 'O(N²)', name: 'Quadratic Time', example: 'Nested Loops / Bubble Sort' },
  { notation: 'O(2ⁿ)', name: 'Exponential Time', example: 'Recursive Fibonacci / Subsets' }
];

export const INTERVIEW_TIPS = [
  '💡 Always clarify edge cases (empty inputs, negative values, integer overflow) before coding.',
  '🗣️ Think out loud during coding interviews to demonstrate your problem-solving approach.',
  '⏱️ Analyze Time and Space complexity before submitting your solution.',
  '🧪 Test your code manually with a small sample input on paper first.'
];
