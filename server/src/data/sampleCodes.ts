// Pre-seeded code samples for quick testing across all supported languages

import { SupportedLanguage } from '../types/analysis';

export interface CodeSample {
  id: string;
  title: string;
  language: SupportedLanguage;
  category: 'Algorithms' | 'Web API' | 'Security / Systems' | 'Data Structures';
  description: string;
  code: string;
}

export const CODE_SAMPLES: CodeSample[] = [
  {
    id: 'two-sum-js',
    title: 'Two Sum with Nested Loops (JS)',
    language: 'javascript',
    category: 'Algorithms',
    description: 'Quadratic brute-force lookup with potential undefined return and performance bottleneck.',
    code: `// Two Sum Problem: Find two numbers that add up to target
function twoSum(nums, target) {
  // Brute force comparison
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        return [i, j];
      }
    }
  }
  // Missing explicit error or empty array handling
}

// Example invocation
const result = twoSum([2, 7, 11, 15], 9);
console.log("Indices:", result);`
  },
  {
    id: 'binary-search-py',
    title: 'Binary Search with Integer Overflow Risk (Python)',
    language: 'python',
    category: 'Algorithms',
    description: 'Classic divide-and-conquer search with edge-case off-by-one boundary risks.',
    code: `def binary_search(arr, target):
    """
    Search for target in sorted array arr.
    Returns index if found, else -1.
    """
    left = 0
    right = len(arr) - 1

    while left <= right:
        # Potential integer overflow issue in languages with fixed-width ints
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

# Sample test
numbers = [1, 3, 5, 7, 9, 11, 15]
print("Found at:", binary_search(numbers, 7))`
  },
  {
    id: 'sql-injection-ts',
    title: 'User Authentication Query (TypeScript)',
    language: 'typescript',
    category: 'Security / Systems',
    description: 'Raw string interpolation inside SQL query leading to severe SQL Injection vulnerability.',
    code: `import { Request, Response } from 'express';
import db from './database';

interface UserLoginDTO {
  username: string;
  passHash: string;
}

export async function loginUser(req: Request, res: Response) {
  const { username, passHash } = req.body as UserLoginDTO;

  // CRITICAL SECURITY RISK: Unsanitized template string in SQL query
  const query = \`SELECT id, username, role FROM users WHERE username = '\${username}' AND password_hash = '\${passHash}'\`;

  try {
    const user = await db.raw(query);
    if (!user || user.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    // Potential information leakage: returning entire user record directly
    return res.status(200).json({ success: true, profile: user[0] });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}`
  },
  {
    id: 'lru-cache-java',
    title: 'LRU Cache with Doubly Linked List (Java)',
    language: 'java',
    category: 'Data Structures',
    description: 'Constant time O(1) Get and Put cache using HashMap and Doubly Linked List.',
    code: `import java.util.HashMap;
import java.util.Map;

public class LRUCache {
    class Node {
        int key, value;
        Node prev, next;
        Node(int k, int v) { key = k; value = v; }
    }

    private final int capacity;
    private final Map<Integer, Node> map;
    private final Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new HashMap<>();
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insertAtHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            remove(map.get(key));
        }
        if (map.size() == capacity) {
            map.remove(tail.prev.key);
            remove(tail.prev);
        }
        Node newNode = new Node(key, value);
        insertAtHead(newNode);
        map.put(key, newNode);
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void insertAtHead(Node node) {
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
        node.prev = head;
    }
}`
  },
  {
    id: 'buffer-overflow-c',
    title: 'String Copy Buffer Vulnerability (C)',
    language: 'c',
    category: 'Security / Systems',
    description: 'Unbounded strcpy and unvalidated user buffer size susceptible to stack buffer overflow.',
    code: `#include <stdio.h>
#include <string.h>

void process_input(const char *user_data) {
    char local_buffer[64];

    // VULNERABILITY: strcpy does not check boundary of destination buffer
    strcpy(local_buffer, user_data);

    printf("Received input: %s\\n", local_buffer);
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: %s <input_string>\\n", argv[0]);
        return 1;
    }

    process_input(argv[1]);
    return 0;
}`
  }
];
