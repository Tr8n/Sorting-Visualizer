import React, { useState, useEffect, useCallback } from 'react';
import './SortingVisualizer.css';

const SelectionSort = () => { 
    const [array, setArray] = useState([]);
    const [arraySize, setArraySize] = useState(50);
    const [isSorting, setIsSorting] = useState(false);

    // Function to generate a new array based on the current size
    const resetArray = useCallback(() => {
        if (isSorting) return;
        const newArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 500));
        setArray(newArray);
    }, [arraySize, isSorting]);

    useEffect(() => {
        resetArray();
    }, [resetArray]);

    // Selection Sort with Animation
    const selectionSort = async () => {
        setIsSorting(true);
        const arr = [...array];

        for (let i = 0; i < arr.length; i++) {
            let minIdx = i;
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]; // Swap elements
                setArray([...arr]);
                await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for animation
            }
        }

        setIsSorting(false);
    };

    // Fast Selection Sort (instant sorting without animation)
    const fastSelectionSort = () => {
        const sortedArray = [...array];
        for (let i = 0; i < sortedArray.length; i++) {
            let minIdx = i;
            for (let j = i + 1; j < sortedArray.length; j++) {
                if (sortedArray[j] < sortedArray[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                [sortedArray[i], sortedArray[minIdx]] = [sortedArray[minIdx], sortedArray[i]];
            }
        }
        setArray(sortedArray);
    };

    // Update array size based on scrollbar
    const handleArraySizeChange = (e) => {
        setArraySize(Number(e.target.value));
        resetArray();
    };

    return (
        <div>
            <h1>Selection Sort Visualizer</h1>

            {/* Array size scrollbar */}
            <div className="array-size-control">
                <label>Array Size: {arraySize}</label>
                <input
                    type="range"
                    min="10"
                    max="250"
                    value={arraySize}
                    onChange={handleArraySizeChange}
                    disabled={isSorting}
                />
            </div>

            {/* Array display */}
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                            height: `${value}px`,
                        }}
                    ></div>
                ))}
            </div>

            {/* Control buttons */}
            <div className="controls">
                <button onClick={resetArray} disabled={isSorting}>Generate New Array</button>
                <button onClick={selectionSort} disabled={isSorting}>Start Sort</button>
                <button onClick={fastSelectionSort} disabled={isSorting}>Fast Sort</button>
            </div>

            {/* Documentation Table */}
            <h2>Notations Documentation</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Notation</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>n</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>Number of elements in the array</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>i</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>Current index in the outer loop</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>j</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>Current index in the inner loop</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>minIdx</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>Index of the minimum element found</td>
                    </tr>
                    <tr>
                        <td style={{ border: '1px solid black', padding: '8px' }}>arr[]</td>
                        <td style={{ border: '1px solid black', padding: '8px' }}>The array being sorted</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SelectionSort;
