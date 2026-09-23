// Curated analyses for pre-seeded demonstration samples
// Ensures immediate interactive exploration of the rich 12-dimensional dashboard

import { CodeAnalysisResult } from '../types/analysis';

export const SAMPLE_ANALYSES: Record<string, CodeAnalysisResult> = {
  'two-sum-js': {
    id: 'sample-two-sum-js',
    analyzedAt: new Date().toISOString(),
    language: 'javascript',
    summary: 'The code implements the classic Two Sum algorithm using a brute-force quadratic search. While logically functional for small inputs, it exhibits an O(n²) time bottleneck, lacks error handling for missing pairs, and uses loose equality.',
    metrics: {
      totalLines: 15,
      codeLines: 10,
      functionsCount: 1,
      classesCount: 0,
      estimatedComplexity: 'Quadratic O(n²)',
      qualityScore: 68,
      verdict: 'Needs Attention'
    },
    bugs: [
      {
        id: 'bug-1',
        severity: 'Medium',
        line: 12,
        problem: 'Implicit undefined return when no complement pair exists.',
        whyItMatters: 'If the input array contains no two numbers summing to the target, the function finishes the loop and returns undefined. Downstream callers expecting an array (e.g. destructuring [a, b]) will throw a runtime TypeError: result is not iterable.',
        suggestedFix: 'Return an empty array [] or throw an explicit Error("No two sum solution found") at the end of the function.',
        codeSnippet: 'return []; // Explicit failure return'
      },
      {
        id: 'bug-2',
        severity: 'Low',
        line: 6,
        problem: 'Use of loose equality operator (==) instead of strict equality (===).',
        whyItMatters: 'In JavaScript, loose equality performs implicit type coercion, which can produce unexpected truthy evaluations if arrays contain string numbers (e.g., "7" + 2 == 9 evaluates as "72" != 9, but in other combinations coercion can mask subtle data issues).',
        suggestedFix: 'Replace == with === to guarantee strict numeric equality checking.',
        codeSnippet: 'if (nums[i] + nums[j] === target)'
      }
    ],
    securityIssues: [
      {
        id: 'sec-1',
        category: 'Denial of Service (Algorithm Complexity)',
        severity: 'Low',
        line: 4,
        issue: 'Quadratic CPU consumption on large unbounded inputs.',
        explanation: 'If an untrusted client submits an array of 100,000 integers to this endpoint, the nested loop will execute ~5,000,000,000 operations, blocking the Node.js single-threaded event loop and starving other user requests.',
        saferApproach: 'Refactor to a single-pass Hash Map algorithm to reduce complexity to linear O(n), and validate input array length boundaries.'
      }
    ],
    complexity: {
      timeComplexity: {
        bigO: 'O(n²)',
        reasoning: 'The outer loop runs n times (where n = nums.length). The inner loop runs (n - 1), (n - 2), ..., 1 times. Summing 1 to n - 1 yields n(n - 1)/2 operations. In asymptotic notation, we drop lower-order terms and constants, yielding O(n²).',
        bestCase: 'O(1) when the very first two elements (indices 0 and 1) add up to the target.',
        averageCase: 'O(n²) when the target pair is situated randomly within the array.',
        worstCase: 'O(n²) when no pair exists, forcing both loops to run to completion.'
      },
      spaceComplexity: {
        bigO: 'O(1)',
        reasoning: 'The algorithm only maintains two integer index pointer variables (i and j). No additional arrays, hash maps, or dynamically allocated structures grow with input size n.',
        auxiliarySpace: 'O(1) auxiliary space.',
        inputSpace: 'O(n) input array storage.'
      }
    },
    performance: [
      {
        id: 'perf-1',
        area: 'Quadratic Brute-Force Nested Loop',
        impact: 'High',
        description: 'For n = 1,000 elements, this takes ~500,000 comparisons. With a Hash Map, it takes only 1,000 comparisons.',
        suggestedOptimization: 'Use a JavaScript Map to store the complement (target - currentNum) and its index. This changes the lookup time from an O(n) inner loop to an O(1) hash table lookup.'
      }
    ],
    codeQuality: {
      readability: 'Good',
      naming: 'Consistent & Clear',
      maintainability: 'Moderate',
      modularity: 'High',
      explanation: 'The code is concise and straightforward to read, but lacks input validation (checking if nums is an array and length >= 2) and modern ES6 idioms.',
      positiveAspects: ['Clean indentation', 'Variable names i and j follow conventional nested indexing norms']
    },
    edgeCases: [
      {
        id: 'edge-1',
        scenario: 'Input array has fewer than 2 elements (e.g. nums = [5] or nums = [])',
        currentBehavior: 'Loops terminate immediately without entering, returning undefined.',
        potentialFailure: 'Caller receives undefined instead of expected error or empty array.',
        recommendedHandling: 'Add early defensive guard: if (!Array.isArray(nums) || nums.length < 2) return [];'
      },
      {
        id: 'edge-2',
        scenario: 'Array contains negative numbers or zero (e.g. nums = [-3, 4, 3, 90], target = 0)',
        currentBehavior: 'Works correctly for arithmetic addition (-3 + 3 === 0).',
        potentialFailure: 'None, mathematical addition is commutative.',
        recommendedHandling: 'Ensure test suite explicitly asserts negative complements.'
      }
    ],
    bestPractices: [
      {
        id: 'bp-1',
        rule: 'Always use strict equality (===)',
        appliesTo: 'JavaScript',
        explanation: 'Avoids unintentional type coercion bugs and communicates clear type intent.',
        recommendation: 'Configure ESLint eqeqeq rule.'
      },
      {
        id: 'bp-2',
        rule: 'Guard against missing inputs and validate signatures',
        appliesTo: 'Defensive Programming',
        explanation: 'Public functions should gracefully reject undefined or malformed arguments.',
        recommendation: 'Check Array.isArray(nums) at function entry.'
      }
    ],
    improvements: {
      originalCode: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        return [i, j];
      }
    }
  }
}`,
      improvedCode: `/**
 * Finds two indices in nums such that their values sum to target.
 * Complexity: O(n) Time | O(n) Space
 * @param {number[]} nums
 * @param {number} target
 * @returns {number[]} Array of two indices, or empty array if not found
 */
export function twoSum(nums, target) {
  // 1. Defensive input validation
  if (!Array.isArray(nums) || nums.length < 2) {
    return [];
  }

  // 2. Single-pass Hash Map for O(1) complement lookups
  const seenComplements = new Map();

  for (let i = 0; i < nums.length; i++) {
    const currentVal = nums[i];
    const complement = target - currentVal;

    // Check if we have already encountered the required number
    if (seenComplements.has(complement)) {
      return [seenComplements.get(complement), i];
    }

    // Record current number and its index
    seenComplements.set(currentVal, i);
  }

  return [];
}`,
      summaryOfChanges: [
        'Replaced nested loops with a single Map pass (O(n²) -> O(n))',
        'Added defensive array length check',
        'Replaced loose equality with Map key lookup',
        'Guaranteed deterministic return type (empty array on failure instead of undefined)',
        'Added JSDoc documentation with complexity annotations'
      ],
      whyChanged: [
        'Massive performance gain on datasets with > 1,000 elements',
        'Eliminates unhandled runtime TypeError in client code',
        'Adheres to modern production TypeScript / ES6 standards'
      ],
      expectedBenefits: [
        'Speedup: From 500ms down to <1ms for 10,000 elements',
        'Zero chance of blocking the single-threaded Node.js event loop'
      ]
    },
    testCases: {
      suiteName: 'TwoSumTestSuite',
      framework: 'Jest',
      unitTestCode: `import { twoSum } from './twoSum';

describe('twoSum', () => {
  test('finds standard positive complement pair', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  test('handles unsorted array with pair in middle', () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  });

  test('handles duplicate numbers forming the target', () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });

  test('handles negative numbers', () => {
    expect(twoSum([-1, -2, -3, -4, -5], -8)).toEqual([2, 4]);
  });

  test('returns empty array when no solution exists', () => {
    expect(twoSum([1, 2, 3], 10)).toEqual([]);
  });

  test('handles boundary input with fewer than 2 elements', () => {
    expect(twoSum([5], 5)).toEqual([]);
    expect(twoSum([], 0)).toEqual([]);
  });
});`,
      cases: [
        {
          id: 'tc-1',
          title: 'Basic positive pair',
          category: 'Normal',
          input: 'nums = [2, 7, 11, 15], target = 9',
          expectedOutput: '[0, 1]',
          purpose: 'Verifies the standard happy-path pair detection.'
        },
        {
          id: 'tc-2',
          title: 'Pair with identical values',
          category: 'Boundary',
          input: 'nums = [3, 3], target = 6',
          expectedOutput: '[0, 1]',
          purpose: 'Ensures duplicates do not collide incorrectly in lookup.'
        },
        {
          id: 'tc-3',
          title: 'No solution exists',
          category: 'Invalid',
          input: 'nums = [1, 2, 3], target = 100',
          expectedOutput: '[]',
          purpose: 'Verifies graceful fallback when no complement exists.'
        },
        {
          id: 'tc-4',
          title: 'Negative numbers and zero',
          category: 'Edge Case',
          input: 'nums = [-5, 0, 5], target = 0',
          expectedOutput: '[0, 2]',
          purpose: 'Ensures signed integers and zero arithmetic behave reliably.'
        }
      ]
    },
    explanation: {
      whatItDoes: 'Imagine you have a list of numbers and a target score. This function acts like a detective searching for any two numbers in that list that sum up to exactly the target score, and tells you where they are located (their index positions).',
      mainIdea: 'The fundamental algorithmic idea here is Pair Searching. The original code uses "Brute Force" — checking every possible pair one by one, like trying every key on a keychain. The optimized version uses "Memory over Computation" (a Hash Map) to remember numbers we have already seen, so we only need to look at each number once.',
      codeStructure: {
        functions: ['twoSum(nums, target): The primary solver function'],
        variables: ['i: Index of first candidate number', 'j: Index of second candidate number', 'nums: Input array of numbers', 'target: Desired sum'],
        loops: ['Outer for-loop: Iterates through each element from index 0 to length - 1', 'Inner for-loop: Iterates through subsequent elements from i + 1 to length - 1'],
        conditionals: ['if (nums[i] + nums[j] == target): Compares candidate sum with target'],
        dataStructures: ['Array (nums): Fixed-order sequential list of numbers']
      },
      blockByBlock: [
        {
          blockName: 'Outer Loop (Candidate A)',
          lines: 'Lines 4-5',
          plainExplanation: 'The outer loop picks our first number, starting from the beginning of the array and moving forward one element at a time.',
          conceptHighlighted: 'Sequential Array Iteration'
        },
        {
          blockName: 'Inner Loop (Candidate B)',
          lines: 'Lines 5-6',
          plainExplanation: 'Notice that j starts at i + 1, not 0. This is crucial: it prevents the function from adding a number to itself, and prevents checking the same pair twice.',
          conceptHighlighted: 'Avoidance of Self-Pairing & Redundancy'
        },
        {
          blockName: 'Sum Comparison & Return',
          lines: 'Lines 6-8',
          plainExplanation: 'We add the two values. If their sum equals the target, we immediately return their index positions inside an array [i, j]. This halts execution early.',
          conceptHighlighted: 'Early Return'
        }
      ],
      executionFlow: [
        {
          phase: '1. Initialization',
          description: 'The function receives nums = [2, 7, 11, 15] and target = 9.'
        },
        {
          phase: '2. First Outer Iteration',
          description: 'i = 0 (value = 2). The inner loop initializes j = 1 (value = 7).'
        },
        {
          phase: '3. Condition Check',
          description: '2 + 7 = 9. The condition (9 == 9) evaluates to true.'
        },
        {
          phase: '4. Immediate Termination',
          description: 'Function returns [0, 1] and exits.'
        }
      ],
      exampleWalkthrough: {
        sampleInput: 'nums = [2, 7, 11, 15], target = 9',
        steps: [
          {
            stepNumber: 1,
            description: 'Outer loop starts at index 0. Current number nums[0] is 2.',
            stateValues: { 'i': '0', 'nums[i]': '2', 'j': 'unset' }
          },
          {
            stepNumber: 2,
            description: 'Inner loop starts at index 1 (i + 1). Current number nums[1] is 7.',
            stateValues: { 'i': '0', 'nums[i]': '2', 'j': '1', 'nums[j]': '7' }
          },
          {
            stepNumber: 3,
            description: 'Calculate sum: 2 + 7 = 9. Check if sum equals target (9). It matches!',
            stateValues: { 'sum': '9', 'target': '9', 'match': 'true' }
          },
          {
            stepNumber: 4,
            description: 'Return indices array [0, 1].',
            stateValues: { 'return': '[0, 1]' }
          }
        ],
        finalOutput: '[0, 1]'
      },
      keyConceptsUsed: [
        {
          concept: 'Time vs Space Trade-off',
          explanation: 'In computer science, you can often make an algorithm significantly faster by using slightly more memory. Moving from brute-force O(n²) to Hash Map O(n) trades O(n) auxiliary memory for a massive reduction in runtime.'
        },
        {
          concept: 'Index Pointers',
          explanation: 'Using variables like i and j to mark coordinates in a sequential memory structure.'
        },
        {
          concept: 'Loose vs Strict Equality',
          explanation: 'In JavaScript, double-equals (==) converts types behind the scenes, whereas triple-equals (===) requires both type and value to match.'
        }
      ],
      commonStudentMistakes: [
        {
          mistake: 'Starting the inner loop at j = 0 instead of j = i + 1',
          whyStudentsMakeIt: 'Students assume both loops should inspect the whole array. If j starts at 0, nums[i] will be paired with itself when i == j, returning false positives (e.g. For target 4 and element 2, it would return [0, 0]).',
          howToAvoid: 'Always initialize j = i + 1 when checking combinations of distinct pairs.'
        },
        {
          mistake: 'Assuming the array is sorted',
          whyStudentsMakeIt: 'Students often try to use two pointers (left and right) without sorting first. Two Sum problem input is not guaranteed to be sorted unless explicitly stated.',
          howToAvoid: 'Clarify preconditions before applying two-pointer techniques.'
        }
      ],
      howCouldThisBeImproved: 'To elevate this code to professional grade, discard the quadratic inner loop entirely and adopt a single-pass Map. In production applications dealing with user data or high throughput, an O(n²) loop is an active latency risk and a denial-of-service hazard.',
      selfQuizQuestions: [
        {
          question: 'If nums has 10,000 elements and no valid pair exists, approximately how many times will line 6 execute?',
          hint: 'Use the formula n(n - 1) / 2.',
          answer: 'Approximately 50,000,000 times! (10,000 × 9,999 / 2 = 49,995,000 comparisons).'
        },
        {
          question: 'Why does the optimized Hash Map approach take O(n) space?',
          hint: 'Think about how many items we might store in the map before finding a solution.',
          answer: 'In the worst case, every element in nums is inserted into the Map before finding a pair (or finding none), requiring memory proportional to the length of the array n.'
        }
      ]
    }
  }
};
