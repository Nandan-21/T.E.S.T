#include <chrono>
#include <cstddef>
#include <iostream>
#include <vector>
#include <random>
#include <iomanip>
//#include <bits/stdc++.h>
#include <algorithm>   
#include <climits>     
#include <type_traits> 




using namespace std;

struct Metrics {

    unsigned long long comparisons = 0;
    unsigned long long ops = 0;
    unsigned long long calls = 0;

    size_t extra_space_bytes = 0;

};


static inline long long now_ns(){
    return chrono::duration_cast<chrono::nanoseconds>(
        chrono::high_resolution_clock::now().time_since_epoch()
    ).count();  
}

//prevent compiler from optimizing away results

volatile unsigned long long sink_u64;
volatile long long sink_i64;

//-------------factorial-------------

unsigned long long fact_iter(int n , Metrics &m) {
    m.ops =  m.comparisons = m.calls = 0;
    m.extra_space_bytes = 0;

    unsigned long long ans = 1;
    for ( int i =2;i<=n;i++){
        m.comparisons++;            // i<= n check(approx)
        m.ops++;                    // mulriplications
        ans *= ( unsigned long long)i;
    }
    return ans;
}

unsigned long long fact_rec_impl(int n , Metrics &m , int depth) {
    m.calls++;
    m.extra_space_bytes = max(m.extra_space_bytes , (size_t) depth * sizeof(void*)*4 );
    //rough stack estimate;goal is to teach "grows with depth"

    m.comparisons++;
    if(n<=1) return 1ULL;

    m.ops++;
    return (unsigned long long)n * fact_rec_impl(n-1,m,depth+1);
}

unsigned long long fact_rec(int n,Metrics &m){
    m.ops=m.comparisons=m.calls=0;
    m.extra_space_bytes=0;
    return fact_rec_impl(n,m,1);
}

// Naive recursion; exponential time (use small n only!)
//---------Fibonacci reseries----------------------

unsigned long long fib_rec_impl(int n,Metrics &m,int depth){
     m.calls++;
     m.extra_space_bytes = max(m.extra_space_bytes , (size_t) depth * sizeof(void*)*4 );

     m.comparisons++;
     if(n<=1) return (unsigned long long)n;

     m.ops++;
     return fib_rec_impl(n-1,m,depth+1) + fib_rec_impl(n-2,m,depth+1); 
}

unsigned long long fib_rec(int n,Metrics &m){
    m.ops=m.comparisons=m.calls=0;
    m.extra_space_bytes=0;
    return fib_rec_impl(n,m,1);
}

unsigned long long fib_iter(int n,Metrics &m){
    m.ops=m.comparisons=m.calls=0;
    m.extra_space_bytes=0;

 if (n<=1) return (unsigned long long)n;
    unsigned long long a=0,b=1;

    for (int i=2;i<=n;i++){
        m.comparisons++;  //loop check approx

        unsigned long long c=a+b;

        m.ops++;        //additon
        a=b;
        b=c;
    }
    return b;
    }

    //--------Array Utilities ( linear scan )--------------

    bool exists_linear(const vector<int> &a,int x,Metrics &m){
    m.ops=m.comparisons=m.calls=0;
    m.extra_space_bytes=0;

    for(int i =0;i<(int)a.size();i++){
        m.comparisons++;
        if(a[i]==x) return true;
    }
    return false;
    }

    int firstAbove_linear(const vector<int>&a , int thresold ,Metrics &m) {
        m.ops=m.comparisons=m.calls=0;
        m.extra_space_bytes=0;

        for(int i=0;i<(int)a.size();i++){
            m.comparisons++;
            if(a[i]>thresold) return i;
        }
        return -1;
    }

    int max_linear(const vector<int> &a, Metrics &m){
        m.ops=m.comparisons=m.calls=0;
        m.extra_space_bytes=0;

        int mx = a.empty()? INT_MIN:a[0];  //turnary operator

        for(int i=1;i<(int)a.size();i++){
            m.comparisons++;   //worst case....because all elements are going to be check

            if(a[i]>mx) mx = a[i];
        }
        return mx;
    }

    //Nested loop "slow analytics" baseline: count pairs with a[i] < a[j]
    unsigned long long countIncreasingPairs_n2(const vector<int> &a,Metrics &m) {
        m.ops=m.comparisons=m.calls=0;
        m.extra_space_bytes=0;

        unsigned long long cnt=0;
        int n = (int)a.size();
        for(int i=0;i<n;i++){
            for(int j=i+1;j<n;j++){
                m.comparisons++;
                if(a[i]<a[j]){
                    cnt++;
                    m.ops++;  // count increment (as "work")
                }
            }
        }

        return cnt;
    }

    enum class Pattern { BEST, AVERAGE, WORST };

vector<int> make_array(int n, Pattern p, int valueWanted, int threshold) {
    vector<int> a(n);
    if (p == Pattern::AVERAGE) {
        // pseudo-random but deterministic
        std::mt19937 rng(12345);
        std::uniform_int_distribution<int> dist(-1000000, 1000000);
        for (int i = 0; i < n; i++) a[i] = dist(rng);
        return a;
    }

    if (p == Pattern::BEST) {
        // Put "valueWanted" at the front for exists() best-case
        // Put something > threshold at the front for firstAbove() best-case
        for (int i = 0; i < n; i++) a[i] = 0;
        if (n > 0) a[0] = valueWanted;
        if (n > 1) a[1] = threshold + 1;
        return a;
    }

    // WORST:
    // - for exists(x): x absent
    // - for firstAbove(threshold): nobody above
    // - for max(): doesn't matter; still scans
    for (int i = 0; i < n; i++) a[i] = threshold; // never above threshold
    // also ensure valueWanted not present
    if (valueWanted == threshold) {
        for (int i = 0; i < n; i++) a[i] = threshold + 1;
    }
    return a;
}

// -------------------------- Benchmark helpers --------------------------
template <class Func>
void run_and_print(const string &label, Func f, Metrics &m) {
    long long t0 = now_ns();
    auto result = f();
    long long t1 = now_ns();

    // sink results to avoid being optimized out
    if constexpr (is_same_v<decltype(result), bool>) sink_i64 = result ? 1 : 0;
    else sink_u64 = (unsigned long long)result;

    cout << left << setw(28) << label
         << " time(ms)=" << setw(8) << (t1 - t0) / 1e6
         << " comps=" << setw(12) << m.comparisons
         << " ops=" << setw(12) << m.ops
         << " calls=" << setw(12) << m.calls
         << " extra_space(B)~" << m.extra_space_bytes
         << "\n";
}

string pattern_name(Pattern p) {
    if (p == Pattern::BEST) return "BEST";
    if (p == Pattern::AVERAGE) return "AVERAGE";
    return "WORST";
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    // Fibonacci recursion becomes huge quickly. Keep this small for demo.
    const int fibRecN = 40;       // adjust carefully; >45 can be slow
    const int fibIterN = 100000;  // iterative can handle large n, but may overflow ULL quickly

    // Factorial overflows ULL quickly too; use n <= 20 for numeric correctness
    const int factN = 20;

    // Array sizes for evidence tables
    vector<int> Ns = {1000, 10000, 100000};

    Metrics m;

    cout << "==== Part A: Factorial (n=" << factN << ") ====\n";
    run_and_print("fact_iter", [&]{ return fact_iter(factN, m); }, m);
    run_and_print("fact_rec",  [&]{ return fact_rec(factN, m);  }, m);

    cout << "\n==== Part B: Fibonacci ====\n";
    cout << "(1) Recursive naive (n=" << fibRecN << ")  [Exponential time]\n";
    run_and_print("fib_rec_naive", [&]{ return fib_rec(fibRecN, m); }, m);

    cout << "(2) Iterative (n=" << fibRecN << ")  [Linear time]\n";
    run_and_print("fib_iter_small", [&]{ return fib_iter(fibRecN, m); }, m);

    cout << "\nNote: fib_iter can run for much larger n, but unsigned long long overflows.\n";
    cout << "      For performance-only tests, you can compute mod M instead.\n";

    // Array utility tests
    int x = 777;
    int threshold = 500;

    for (Pattern p : {Pattern::BEST, Pattern::AVERAGE, Pattern::WORST}) {
        cout << "\n==== Part C: Array Utilities (" << pattern_name(p) << " cases) ====\n";
        for (int n : Ns) {
            auto a = make_array(n, p, x, threshold);

            cout << "\n-- n=" << n << " --\n";
            run_and_print("exists_linear", [&]{ return exists_linear(a, x, m); }, m);
            run_and_print("firstAbove_linear", [&]{ return (unsigned long long)firstAbove_linear(a, threshold, m); }, m);
            run_and_print("max_linear", [&]{ return (unsigned long long)max_linear(a, m); }, m);

            // Nested loop baseline: only run up to 10k by default (n^2 explodes)
            if (n <= 10000) {
                run_and_print("pairs_n2_baseline", [&]{ return countIncreasingPairs_n2(a, m); }, m);
            } else {
                cout << left << setw(28) << "pairs_n2_baseline"
                     << " skipped (n too large for O(n^2) demo)\n";
            }
        }
    }

    cout << "\n==== What students should submit ====\n";
    cout << "1) For each utility: identify BEST/AVG/WORST input patterns.\n";
    cout << "2) Classify time complexity (O(1), O(n), O(n^2), etc.) and space complexity.\n";
    cout << "3) Provide evidence tables: comparisons/time vs n.\n";
    cout << "4) Explain whether early-break changes Big-O or only constants.\n";

    return 0;
}
