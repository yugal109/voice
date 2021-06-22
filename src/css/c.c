#include <stdio.h>

int main()
{
    int length = 0;
    int num, j, nm, last;

    char STR[50][50] = {"Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
                        "Ten", "Elleven", "Twelve", "Thirteen", "Fouteen", "Fifteen", "Sixteen", "Seventeen", "Eightteen", "Nineteen"};
    char NEW[50][50] = {"Ten", "Twenty", "Thirty", "Fourty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"};
    char VALS[50][50] = {"Hundred", "Thousand", "Lakh", "Crore"};
    printf("Enter a number.\n");
    scanf("%d", &num);
    int ar[100];
    j = nm = num;
    while (j != 0)
    {
        length++;
        j /= 10;
    }
    for (int i = length; i >= 0; i--)
    {
        last = nm % 10;
        ar[i - 1] = last;
        nm /= 10;
    }

    if (length == 1)
    {
        printf("%s", STR[ar[0]]);
    }
    else if (length == 2)
    {
        int len = (ar[0] * 10 + ar[1]);
        printf("%s", STR[len]);
    }
    else if (length == 3)
    {
        if (ar[1] == 0 && ar[2] == 0)
        {
            printf("%s %s", STR[ar[0]], VALS[0]);
        }
        else if (ar[2] == 0)
        {
            for (int i = 1; i <= 9; i++)
            {
                if (ar[1] == i)
                {
                    printf("%s %s and %s", STR[ar[0]], VALS[0], NEW[i-1]);
                }
            }
        }else if( ar[1]==0){
            printf("%s %s and %s", STR[ar[0]], VALS[0],STR[ar[2]]);
        }
        else
        {
            for (int j = 10; j <= 19; j++)
            {
                if ((ar[1] * 10 + ar[2]) == j)
                {
                    printf("%s %s and %s", STR[ar[0]], VALS[0], STR[j]);
                }
            }
            for (int i = 2; i <= 9; i++)
            {
                if (ar[1] == i)
                {
                    printf("%s %s and %s %s", STR[ar[0]], VALS[0], NEW[i - 1], STR[ar[2]]);
                }
            }
        }
    }
    else if (length == 4)
    {
        if (ar[1] == 0 && ar[2] == 0 && ar[3] == 0)
        {
            printf("%s %s", STR[ar[0]], VALS[1]);
        }
        else if (ar[2] == 0 && ar[3] == 0)
        {
            printf("%s %s and %s %s", STR[ar[0]], VALS[1], STR[ar[1]], VALS[0]);
        }
        else if (ar[3] == 0)
        {
            for (int i = 1; i <= 9; i++)
            {
                if (ar[2] == i)
                {
                    printf("%s %s  %s %s and %s", STR[ar[0]], VALS[1], STR[ar[1]], VALS[0], NEW[i - 1]);
                }
            }
        }else if(ar[1]==0){
            for (int j = 11; j <= 19; j++)
            {
                if ((ar[2] * 10 + ar[3]) == j)
                {
                    printf("%s %s and %s", STR[ar[0]], VALS[1], STR[j]);
                }
            }

            for (int j = 2; j <= 9; j++)
            {
                if (ar[2] == j)
                {
                    printf("%s %s and  %s %s", STR[ar[0]], VALS[1],NEW[j-1], STR[ar[3]]);
                }
            }
          
        }
        else
        {

            for (int j = 11; j <= 19; j++)
            {
                if ((ar[2] * 10 + ar[3]) == j)
                {
                    printf("%s %s  %s %s and %s", STR[ar[0]], VALS[1], STR[ar[1]], VALS[0], STR[j]);
                }
            }

            for (int j = 2; j <= 9; j++)
            {
                if (ar[2] == j)
                {
                    printf("%s %s  %s %s and %s %s", STR[ar[0]], VALS[1], STR[ar[1]], VALS[0], NEW[j - 1], STR[ar[3]]);
                }
            }
        }
    }
    else
    {
        printf("Zero");

    }

    printf("\n");

    return 0;
}